import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Upload, Camera, UserCog, Wand2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    icon: Upload,
    number: 1,
    title: "Escolha a História",
    description: "Selecione nossa aventura amazônica especialmente criada para crianças brasileiras"
  },
  {
    icon: Camera,
    number: 2,
    title: "Envie a Foto",
    description: "Faça upload de uma foto clara do rosto do seu filho para personalização"
  },
  {
    icon: UserCog,
    number: 3,
    title: "Adicione Detalhes",
    description: "Insira o nome e idade do seu filho para uma experiência ainda mais pessoal"
  },
  {
    icon: Wand2,
    number: 4,
    title: "Gere & Compre",
    description: "Visualize sua história personalizada e escolha entre versão digital ou impressa"
  }
];

export default function HowItWorks() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins text-4xl font-bold text-foreground">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-6 group" data-testid={`step-${step.number}`}>
              <div className="relative">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="text-white text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-poppins text-xl font-semibold text-foreground" data-testid={`step-title-${step.number}`}>
                  {t(`step.${step.number}.title` as any)}
                </h3>
                <p className="text-foreground/70" data-testid={`step-description-${step.number}`}>
                  {t(`step.${step.number}.description` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/create-story">
            <Button size="lg" className="bg-accent text-white hover:bg-accent/90 font-poppins font-semibold shadow-lg" data-testid="button-start-now">
              {t('button.startNow')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
