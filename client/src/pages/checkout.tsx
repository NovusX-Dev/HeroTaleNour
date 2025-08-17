import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/header";
import Footer from "@/components/footer";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Nome é obrigatório"),
  customerEmail: z.string().email("Email inválido"),
  customerPhone: z.string().optional(),
  format: z.enum(['digital', 'print']),
  shippingAddress: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingState: z.string().optional(),
  shippingZipCode: z.string().optional(),
}).refine((data) => {
  if (data.format === 'print') {
    return data.shippingAddress && data.shippingCity && data.shippingState && data.shippingZipCode;
  }
  return true;
}, {
  message: "Endereço completo é obrigatório para livros impressos",
  path: ["shippingAddress"]
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = ({ clientSecret, orderData }: { clientSecret: string; orderData: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      toast({
        title: "Erro no Pagamento",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Pagamento Realizado!",
        description: "Seu livro será processado e enviado em breve.",
      });
      setLocation('/');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-primary text-white hover:bg-primary/90 py-3 text-lg font-semibold"
        data-testid="button-pay"
      >
        {isProcessing ? "Processando..." : `Pagar R$ ${(orderData.price / 100).toFixed(2)}`}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      format: 'print',
    }
  });

  const selectedFormat = form.watch('format');

  useEffect(() => {
    const storedData = localStorage.getItem('checkoutData');
    if (!storedData) {
      toast({
        title: "Dados não encontrados",
        description: "Por favor, crie sua história primeiro.",
        variant: "destructive",
      });
      setLocation('/create-story');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      setCheckoutData(data);
    } catch (error) {
      toast({
        title: "Erro nos dados",
        description: "Dados corrompidos. Por favor, refaça o processo.",
        variant: "destructive",
      });
      setLocation('/create-story');
    }
  }, [setLocation, toast]);

  const createOrderMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setOrderData(data);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar pedido",
        description: error.message || "Não foi possível processar o pedido. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (!checkoutData) return;

    const orderPayload = {
      childName: checkoutData.childName,
      childAge: checkoutData.childAge,
      childPhotoUrl: checkoutData.photoBase64,
      storyId: "amazon-adventure",
      format: data.format,
      customerInfo: {
        name: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
      },
      ...(data.format === 'print' && {
        shippingInfo: {
          address: data.shippingAddress!,
          city: data.shippingCity!,
          state: data.shippingState!,
          zipCode: data.shippingZipCode!,
        }
      })
    };

    createOrderMutation.mutate(orderPayload);
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="font-poppins text-3xl font-bold text-foreground mb-4">
              Finalizar Pedido
            </h1>
            <p className="text-foreground/70">
              Preencha seus dados para completar a compra da história personalizada
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Seus Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Nome Completo</Label>
                    <Input
                      id="customerName"
                      {...form.register('customerName')}
                      data-testid="input-customer-name"
                    />
                    {form.formState.errors.customerName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.customerName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      {...form.register('customerEmail')}
                      data-testid="input-customer-email"
                    />
                    {form.formState.errors.customerEmail && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.customerEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="customerPhone">Telefone (opcional)</Label>
                    <Input
                      id="customerPhone"
                      {...form.register('customerPhone')}
                      data-testid="input-customer-phone"
                    />
                  </div>

                  <div>
                    <Label>Formato do Livro</Label>
                    <RadioGroup
                      value={selectedFormat}
                      onValueChange={(value) => form.setValue('format', value as 'digital' | 'print')}
                      className="mt-2"
                      data-testid="radio-format"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="digital" id="digital" />
                        <Label htmlFor="digital">Digital (R$ 39,00)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="print" id="print" />
                        <Label htmlFor="print">Impresso + Digital (R$ 89,00)</Label>
                        <Badge className="bg-accent text-white text-xs">Mais Popular</Badge>
                      </div>
                    </RadioGroup>
                  </div>

                  {selectedFormat === 'print' && (
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-semibold">Endereço de Entrega</h4>
                      
                      <div>
                        <Label htmlFor="shippingAddress">Endereço</Label>
                        <Input
                          id="shippingAddress"
                          {...form.register('shippingAddress')}
                          data-testid="input-shipping-address"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shippingCity">Cidade</Label>
                          <Input
                            id="shippingCity"
                            {...form.register('shippingCity')}
                            data-testid="input-shipping-city"
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingState">Estado</Label>
                          <Input
                            id="shippingState"
                            {...form.register('shippingState')}
                            data-testid="input-shipping-state"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="shippingZipCode">CEP</Label>
                        <Input
                          id="shippingZipCode"
                          {...form.register('shippingZipCode')}
                          data-testid="input-shipping-zipcode"
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    disabled={createOrderMutation.isPending}
                    data-testid="button-create-order"
                  >
                    {createOrderMutation.isPending ? "Criando pedido..." : "Continuar para Pagamento"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground">{checkoutData.personalizedStory.title}</h3>
                    <p className="text-sm text-foreground/70 mt-2">
                      Protagonista: {checkoutData.childName}, {checkoutData.childAge} anos
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>História personalizada</span>
                    <span data-testid="text-story-price">{selectedFormat === 'digital' ? 'R$ 39,00' : 'R$ 89,00'}</span>
                  </div>
                  {selectedFormat === 'print' && (
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span data-testid="text-shipping-price">Grátis</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span data-testid="text-total-price">{selectedFormat === 'digital' ? 'R$ 39,00' : 'R$ 89,00'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-3xl font-bold text-foreground mb-4">
            Pagamento
          </h1>
          <p className="text-foreground/70">
            Complete seu pagamento de forma segura
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} orderData={orderData} />
            </Elements>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
