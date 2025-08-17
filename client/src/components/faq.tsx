import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqs = [
  {
    id: 1,
    question: "Quanto tempo demora para criar a história?",
    answer: "A criação da história personalizada leva apenas alguns minutos após o upload da foto. Você receberá uma prévia imediata e poderá revisar antes de finalizar a compra."
  },
  {
    id: 2,
    question: "A história é adequada para que idade?",
    answer: "Nossa aventura amazônica foi especialmente desenvolvida para crianças de 4 a 8 anos, com linguagem apropriada e valores educativos para cada faixa etária."
  },
  {
    id: 3,
    question: "Posso fazer alterações após a compra?",
    answer: "Sim! Você pode solicitar alterações no nome ou trocar a foto antes da impressão. Para livros digitais, oferecemos uma revisão gratuita dentro de 24 horas."
  },
  {
    id: 4,
    question: "Qual o prazo de entrega para livros impressos?",
    answer: "A produção leva 3-5 dias úteis e a entrega varia de 5-12 dias úteis dependendo da sua região. Você receberá código de rastreamento para acompanhar o envio."
  }
];

export default function FAQ() {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins text-4xl font-bold text-foreground">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-foreground/70">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white rounded-xl border border-gray-100 shadow-sm"
              data-testid={`faq-item-${faq.id}`}
            >
              <button 
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(faq.id)}
                data-testid={`faq-toggle-${faq.id}`}
              >
                <span className="font-poppins font-semibold text-foreground text-lg">
                  {faq.question}
                </span>
                {openItems.includes(faq.id) ? (
                  <ChevronUp className="h-5 w-5 text-foreground/50" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground/50" />
                )}
              </button>
              {openItems.includes(faq.id) && (
                <div 
                  className="px-6 pb-6 text-foreground/70 leading-relaxed"
                  data-testid={`faq-answer-${faq.id}`}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
