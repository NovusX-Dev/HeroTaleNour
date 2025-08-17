import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Wand2, Play, Star, BookOpen } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-pattern bg-gradient-to-br from-background to-secondary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="font-poppins text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Seu Filho é o{" "}
                <span className="text-primary">Herói</span> da{" "}
                <span className="text-secondary">Aventura!</span>
              </h1>
              <p className="text-xl text-foreground/80 leading-relaxed">
                Crie histórias personalizadas onde seu filho vive aventuras incríveis pela cultura brasileira. 
                Cada página é uma nova descoberta cheia de magia e aprendizado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create-story">
                <Button 
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 font-poppins font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  data-testid="button-create-now"
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Criar História Agora
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-poppins font-semibold text-lg transition-all duration-300"
                data-testid="button-view-example"
              >
                <Play className="mr-2 h-5 w-5" />
                Ver Exemplo
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <img 
                    src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&w=40&h=40&fit=crop&crop=face" 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    alt="Happy parent"
                    data-testid="avatar-1"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=40&h=40&fit=crop&crop=face" 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    alt="Happy parent"
                    data-testid="avatar-2"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&w=40&h=40&fit=crop&crop=face" 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    alt="Happy parent"
                    data-testid="avatar-3"
                  />
                </div>
                <span className="text-sm text-foreground/70" data-testid="text-families">+500 famílias felizes</span>
              </div>
              <div className="flex items-center space-x-1 text-secondary">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm text-foreground/70 ml-2" data-testid="text-rating">4.9/5 estrelas</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Brazilian children in carnival celebration" 
              className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
              data-testid="img-hero"
            />
            
            <div className="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-full shadow-lg animate-bounce-gentle">
              <span className="font-fredoka text-sm">Novo!</span>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <BookOpen className="text-white h-6 w-6" />
                </div>
                <div>
                  <p className="font-poppins font-semibold text-foreground" data-testid="text-pages">15 Páginas</p>
                  <p className="text-sm text-foreground/70" data-testid="text-adventure">De aventura pura!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
