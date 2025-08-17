import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Tablet, Book, Shield, Truck, RotateCcw } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-white" id="pricing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins text-4xl font-bold text-foreground">
            Escolha Seu Formato
          </h2>
          <p className="text-xl text-foreground/70">
            Digital para leitura imediata ou impresso para guardar para sempre
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Tablet className="text-primary text-2xl" />
              </div>
              
              <div>
                <h3 className="font-poppins text-2xl font-bold text-foreground mb-2">
                  Versão Digital
                </h3>
                <p className="text-foreground/70">
                  Acesso imediato em qualquer dispositivo
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary" data-testid="price-digital">R$ 39</span>
                  <span className="text-foreground/70 ml-2">uma vez</span>
                </div>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>15 páginas personalizadas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Download imediato (PDF)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Leitura em tablets e smartphones</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Qualidade HD para impressão caseira</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-primary text-white hover:bg-primary/90 font-poppins font-semibold" data-testid="button-choose-digital">
                Escolher Digital
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-accent shadow-lg hover:shadow-xl transition-shadow relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-accent text-white px-4 py-2">
                Mais Popular
              </Badge>
            </div>
            
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Book className="text-accent text-2xl" />
              </div>
              
              <div>
                <h3 className="font-poppins text-2xl font-bold text-foreground mb-2">
                  Livro Impresso + Digital
                </h3>
                <p className="text-foreground/70">
                  Livro físico premium + versão digital
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-accent" data-testid="price-print">R$ 89</span>
                  <span className="text-foreground/70 ml-2">+ frete</span>
                  <div className="text-sm text-foreground/50 line-through" data-testid="price-original">R$ 120</div>
                </div>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Livro físico capa dura (21x21cm)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Papel couché de alta qualidade</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Versão digital incluída</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Entrega em 7-10 dias úteis</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Embalagem presente grátis</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-accent text-white hover:bg-accent/90 font-poppins font-semibold" data-testid="button-choose-print">
                Escolher Impresso + Digital
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex items-center justify-center space-x-6 text-foreground/70">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Pagamento 100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Frete para todo Brasil</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5 text-secondary" />
              <span>Garantia de 30 dias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
