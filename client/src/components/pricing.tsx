import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Tablet, Book, Shield, Truck, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-b from-background to-white" id="pricing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins text-4xl font-bold text-foreground">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-foreground/70">
            {t('pricing.subtitle')}
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
                  {t('pricing.digital.title')}
                </h3>
                <p className="text-foreground/70">
                  {t('pricing.digital.subtitle')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary" data-testid="price-digital">R$ 39</span>
                  <span className="text-foreground/70 ml-2">{t('pricing.oneTime')}</span>
                </div>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.digital.feature1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.digital.feature2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.digital.feature3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.digital.feature4')}</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-primary text-white hover:bg-primary/90 font-poppins font-semibold" data-testid="button-choose-digital">
                {t('button.chooseDigital')}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-accent shadow-lg hover:shadow-xl transition-shadow relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-accent text-white px-4 py-2">
                {t('pricing.mostPopular')}
              </Badge>
            </div>
            
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Book className="text-accent text-2xl" />
              </div>
              
              <div>
                <h3 className="font-poppins text-2xl font-bold text-foreground mb-2">
                  {t('pricing.print.title')}
                </h3>
                <p className="text-foreground/70">
                  {t('pricing.print.subtitle')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-accent" data-testid="price-print">R$ 89</span>
                  <span className="text-foreground/70 ml-2">{t('pricing.plusShipping')}</span>
                  <div className="text-sm text-foreground/50 line-through" data-testid="price-original">R$ 120</div>
                </div>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.print.feature1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.print.feature2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.print.feature3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.print.feature4')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{t('pricing.print.feature5')}</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-accent text-white hover:bg-accent/90 font-poppins font-semibold" data-testid="button-choose-print">
                {t('button.choosePrint')}
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex items-center justify-center space-x-6 text-foreground/70">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>{t('pricing.securePayment')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>{t('pricing.shippingBrazil')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5 text-secondary" />
              <span>{t('pricing.guarantee')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
