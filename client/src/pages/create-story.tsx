import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import PhotoUpload from "@/components/photo-upload";
import StoryPreview from "@/components/story-preview";
import Footer from "@/components/footer";

interface PersonalizeRequest {
  childName: string;
  childAge: number;
}

interface PersonalizedStory {
  storyId: string;
  title: string;
  description: string;
  content: Array<{
    pageNumber: number;
    text: string;
    imagePrompt: string;
  }>;
  childName: string;
  childAge: number;
}

export default function CreateStory() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [uploadData, setUploadData] = useState<{
    childName: string;
    childAge: number;
    photo: File | null;
  }>({ childName: "", childAge: 0, photo: null });
  const [personalizedStory, setPersonalizedStory] = useState<PersonalizedStory | null>(null);

  const personalizeStoryMutation = useMutation({
    mutationFn: async (data: PersonalizeRequest) => {
      const response = await apiRequest("POST", "/api/stories/amazon-adventure/personalize", data);
      return response.json();
    },
    onSuccess: (data: PersonalizedStory) => {
      setPersonalizedStory(data);
      toast({
        title: "História Personalizada!",
        description: "Sua história foi criada com sucesso. Confira a prévia!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao Personalizar",
        description: error.message || "Não foi possível personalizar a história. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!uploadData.childName.trim()) {
      toast({
        title: "Nome Obrigatório",
        description: "Por favor, insira o nome da criança.",
        variant: "destructive",
      });
      return;
    }

    if (!uploadData.childAge || uploadData.childAge < 4 || uploadData.childAge > 8) {
      toast({
        title: "Idade Inválida",
        description: "Por favor, selecione uma idade entre 4 e 8 anos.",
        variant: "destructive",
      });
      return;
    }

    if (!uploadData.photo) {
      toast({
        title: "Foto Obrigatória",
        description: "Por favor, faça upload de uma foto da criança.",
        variant: "destructive",
      });
      return;
    }

    personalizeStoryMutation.mutate({
      childName: uploadData.childName,
      childAge: uploadData.childAge,
    });
  };

  const handleProceedToCheckout = () => {
    if (personalizedStory && uploadData.photo) {
      // Store data in localStorage for checkout
      const checkoutData = {
        personalizedStory,
        photo: uploadData.photo,
        childName: uploadData.childName,
        childAge: uploadData.childAge,
      };
      
      // Convert File to base64 for storage
      const reader = new FileReader();
      reader.onload = () => {
        const photoBase64 = reader.result as string;
        localStorage.setItem('checkoutData', JSON.stringify({
          ...checkoutData,
          photoBase64,
        }));
        setLocation('/checkout');
      };
      reader.readAsDataURL(uploadData.photo);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-poppins text-4xl font-bold text-foreground">
              Personalize Sua História
            </h2>
            <p className="text-xl text-foreground/70">
              Vamos criar uma aventura única para seu pequeno herói
            </p>
          </div>

          <div className="bg-gradient-to-br from-background to-secondary/5 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <PhotoUpload onDataChange={setUploadData} />
              
              <StoryPreview 
                personalizedStory={personalizedStory}
                onGenerate={handleGenerate}
                isGenerating={personalizeStoryMutation.isPending}
              />
            </div>

            {personalizedStory && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleProceedToCheckout}
                  className="bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors font-poppins font-semibold text-lg shadow-lg"
                  data-testid="button-proceed-checkout"
                >
                  Continuar para Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
