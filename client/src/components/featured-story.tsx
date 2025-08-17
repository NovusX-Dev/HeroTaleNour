import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Leaf, Users, Map } from "lucide-react";

export default function FeaturedStory() {
  return (
    <section className="py-20 bg-white" id="stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins text-4xl font-bold text-foreground">
            Nossa História Especial
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Uma aventura emocionante pela cultura brasileira, cheia de valores e descobertas
          </p>
        </div>

        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary text-white">
                Cultura Brasileira • Idades 4-8 anos
              </Badge>
              
              <h3 className="font-poppins text-3xl font-bold text-foreground">
                A Grande Aventura na Floresta Amazônica
              </h3>
              
              <p className="text-foreground/80 leading-relaxed text-lg">
                <span className="font-semibold text-primary">Seu filho</span> embarca em uma jornada mágica pela Floresta Amazônica, 
                onde conhece animais incríveis, aprende sobre a importância da natureza e descobre 
                o verdadeiro significado da coragem e amizade.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Leaf className="text-white text-sm" />
                  </div>
                  <span className="text-foreground" data-testid="text-learning-environment">Aprende sobre preservação ambiental</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Users className="text-white text-sm" />
                  </div>
                  <span className="text-foreground" data-testid="text-learning-values">Desenvolve valores de amizade e coragem</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Map className="text-white text-sm" />
                  </div>
                  <span className="text-foreground" data-testid="text-learning-culture">Explora a rica cultura amazônica</span>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/create-story">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-poppins font-semibold shadow-lg" data-testid="button-personalize-story">
                    <Camera className="mr-2 h-5 w-5" />
                    Personalizar Esta História
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800" 
                alt="Amazon rainforest adventure scene" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="img-story-preview"
              />
              
              <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-page-count">15</div>
                  <div className="text-xs text-foreground/70">páginas</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-poppins font-semibold text-foreground" data-testid="text-format">Digital + Impresso</p>
                    <p className="text-sm text-foreground/70" data-testid="text-delivery">Entrega em todo Brasil</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary" data-testid="text-price">R$ 89</p>
                    <p className="text-sm text-foreground/70 line-through" data-testid="text-original-price">R$ 120</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
