import { Link } from "wouter";
import { BookOpen, Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2" data-testid="footer-logo">
              <div className="bg-primary rounded-full p-2">
                <BookOpen className="text-white text-xl" />
              </div>
              <span className="font-fredoka text-2xl text-white">YouAreTheHero</span>
            </Link>
            <p className="text-white/70 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                data-testid="social-whatsapp"
              >
                <MessageCircle className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-poppins text-lg font-semibold text-white">{t('footer.product')}</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors" data-testid="footer-how-it-works">{t('nav.howItWorks')}</Link></li>
              <li><Link href="/#stories" className="hover:text-white transition-colors" data-testid="footer-stories">{t('nav.stories')}</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors" data-testid="footer-pricing">{t('nav.pricing')}</Link></li>
              <li><Link href="/create-story" className="hover:text-white transition-colors" data-testid="footer-examples">Exemplos</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-poppins text-lg font-semibold text-white">{t('footer.support')}</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/#faq" className="hover:text-white transition-colors" data-testid="footer-faq">{t('footer.helpCenter')}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-contact">{t('footer.contact')}</a></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors" data-testid="footer-help">{t('nav.faq')}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-tracking">Rastreamento</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-poppins text-lg font-semibold text-white">{t('footer.contact')}</h4>
            <div className="space-y-3 text-white/70">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span data-testid="contact-email">ola@youarethehero.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span data-testid="contact-phone">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span data-testid="contact-address">São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm" data-testid="copyright">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors" data-testid="footer-terms">{t('footer.terms')}</a>
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors" data-testid="footer-privacy">{t('footer.privacy')}</a>
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors" data-testid="footer-cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
