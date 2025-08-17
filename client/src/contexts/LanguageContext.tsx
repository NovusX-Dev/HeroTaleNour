import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt-br' | 'en-us';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  'pt-br': {
    // Header
    'nav.stories': 'Histórias',
    'nav.howItWorks': 'Como Funciona',
    'nav.pricing': 'Preços',
    'nav.faq': 'FAQ',
    'button.createStory': 'Criar História',
    
    // Hero Section
    'hero.title.1': 'Seu Filho é o',
    'hero.title.2': 'Herói',
    'hero.title.3': 'da',
    'hero.title.4': 'Aventura!',
    'hero.subtitle': 'Crie histórias personalizadas onde seu filho vive aventuras incríveis pela cultura brasileira. Cada página é uma nova descoberta cheia de magia e aprendizado.',
    'button.createNow': 'Criar História Agora',
    'button.viewExample': 'Ver Exemplo',
    'text.families': '+500 famílias felizes',
    'text.rating': '4.9/5 estrelas',
    'text.pages': '15 Páginas',
    'text.adventure': 'De aventura pura!',
    
    // Featured Story
    'featuredStory.title': 'Nossa História Especial',
    'featuredStory.subtitle': 'Uma aventura emocionante pela cultura brasileira, cheia de valores e descobertas',
    'featuredStory.storyTitle': 'A Grande Aventura na Floresta Amazônica',
    'featuredStory.description': 'embarca em uma jornada mágica pela Floresta Amazônica, onde conhece animais incríveis, aprende sobre a importância da natureza e descobre o verdadeiro significado da coragem e amizade.',
    'featuredStory.learning.environment': 'Aprende sobre preservação ambiental',
    'featuredStory.learning.values': 'Desenvolve valores de amizade e coragem',
    'featuredStory.learning.culture': 'Explora a rica cultura amazônica',
    'button.personalizeStory': 'Personalizar Esta História',
    'text.format': 'Digital + Impresso',
    'text.delivery': 'Entrega em todo Brasil',
    
    // How It Works
    'howItWorks.title': 'Como Funciona',
    'howItWorks.subtitle': 'Em apenas 4 passos simples, você cria uma história única para seu filho',
    'step.1.title': 'Escolha a História',
    'step.1.description': 'Selecione nossa aventura amazônica especialmente criada para crianças brasileiras',
    'step.2.title': 'Envie a Foto',
    'step.2.description': 'Faça upload de uma foto clara do rosto do seu filho para personalização',
    'step.3.title': 'Adicione Detalhes',
    'step.3.description': 'Insira o nome e idade do seu filho para uma experiência ainda mais pessoal',
    'step.4.title': 'Gere & Compre',
    'step.4.description': 'Visualize sua história personalizada e escolha entre versão digital ou impressa',
    'button.startNow': 'Começar Agora - É Grátis Visualizar!',
    
    // Pricing
    'pricing.title': 'Escolha Seu Formato',
    'pricing.subtitle': 'Digital para leitura imediata ou impresso para guardar para sempre',
    'pricing.digital.title': 'Versão Digital',
    'pricing.digital.subtitle': 'Acesso imediato em qualquer dispositivo',
    'pricing.print.title': 'Livro Impresso + Digital',
    'pricing.print.subtitle': 'Livro físico premium + versão digital',
    'pricing.mostPopular': 'Mais Popular',
    'button.chooseDigital': 'Escolher Digital',
    'button.choosePrint': 'Escolher Impresso + Digital',
    
    // Reviews
    'reviews.title': 'O Que Dizem Os Pais',
    'reviews.subtitle': 'Histórias reais de famílias que já viveram essa magia',
    
    // FAQ
    'faq.title': 'Perguntas Frequentes',
    'faq.subtitle': 'Tudo que você precisa saber sobre nossos livros personalizados',
    
    // Footer
    'footer.description': 'Criamos histórias mágicas onde seu filho é o protagonista de aventuras incríveis pela rica cultura brasileira.',
    'footer.product': 'Produto',
    'footer.support': 'Suporte',
    'footer.contact': 'Contato',
    'footer.helpCenter': 'Central de Ajuda',
    'footer.terms': 'Termos de Uso',
    'footer.privacy': 'Política de Privacidade',
    'footer.copyright': '© 2024 YouAreTheHero. Todos os direitos reservados.',
    
    // Create Story Page
    'createStory.title': 'Personalize Sua História',
    'createStory.subtitle': 'Vamos criar uma aventura única para seu pequeno herói',
    'photoUpload.title': 'Upload da Foto',
    'photoUpload.dragDrop': 'Arraste e solte a foto aqui',
    'photoUpload.clickSelect': 'ou clique para selecionar',
    'button.chooseFile': 'Escolher Arquivo',
    'photoUpload.success': 'Foto carregada com sucesso!',
    'photoUpload.clickChange': 'Clique para alterar',
    'photoUpload.tips.title': 'Dicas para a melhor foto:',
    'photoUpload.tips.1': '• Rosto bem iluminado e claro',
    'photoUpload.tips.2': '• Olhando diretamente para a câmera',
    'photoUpload.tips.3': '• Sem óculos ou objetos no rosto',
    'photoUpload.tips.4': '• Formato JPG ou PNG, máximo 5MB',
    'childDetails.title': 'Detalhes da Criança',
    'input.childName': 'Nome da criança',
    'input.childName.placeholder': 'Ex: Ana Sofia',
    'input.childAge': 'Idade',
    'input.childAge.placeholder': 'Selecione a idade',
    'storyPreview.title': 'Prévia da Personalização',
    'storyPreview.placeholder.1': 'Prévia aparecerá aqui',
    'storyPreview.placeholder.2': 'após preencher os dados',
    'storyPreview.pageIndicator': 'Página 1 de 15',
    'button.generateStory': 'Gerar História Personalizada',
    'button.generating': 'Gerando História...',
    'button.proceedCheckout': 'Continuar para Checkout',
    
    // Checkout
    'checkout.title': 'Finalizar Pedido',
    'checkout.subtitle': 'Preencha seus dados para completar a compra da história personalizada',
    'checkout.yourData': 'Seus Dados',
    'checkout.orderSummary': 'Resumo do Pedido',
    'input.customerName': 'Nome Completo',
    'input.customerEmail': 'Email',
    'input.customerPhone': 'Telefone (opcional)',
    'checkout.bookFormat': 'Formato do Livro',
    'checkout.digital': 'Digital (R$ 39,00)',
    'checkout.print': 'Impresso + Digital (R$ 89,00)',
    'checkout.shippingAddress': 'Endereço de Entrega',
    'input.address': 'Endereço',
    'input.city': 'Cidade',
    'input.state': 'Estado',
    'input.zipCode': 'CEP',
    'button.createOrder': 'Continuar para Pagamento',
    'button.creating': 'Criando pedido...',
    'checkout.payment.title': 'Pagamento',
    'checkout.payment.subtitle': 'Complete seu pagamento de forma segura',
    'button.pay': 'Pagar R$',
    'button.processing': 'Processando...',
    
    // Toast Messages
    'toast.storyPersonalized': 'História Personalizada!',
    'toast.storyPersonalized.desc': 'Sua história foi criada com sucesso. Confira a prévia!',
    'toast.error.personalize': 'Erro ao Personalizar',
    'toast.error.personalize.desc': 'Não foi possível personalizar a história. Tente novamente.',
    'toast.nameRequired': 'Nome Obrigatório',
    'toast.nameRequired.desc': 'Por favor, insira o nome da criança.',
    'toast.ageInvalid': 'Idade Inválida',
    'toast.ageInvalid.desc': 'Por favor, selecione uma idade entre 4 e 8 anos.',
    'toast.photoRequired': 'Foto Obrigatória',
    'toast.photoRequired.desc': 'Por favor, faça upload de uma foto da criança.',
    'toast.paymentSuccess': 'Pagamento Realizado!',
    'toast.paymentSuccess.desc': 'Seu livro será processado e enviado em breve.',
    'toast.paymentError': 'Erro no Pagamento',
  },
  'en-us': {
    // Header
    'nav.stories': 'Stories',
    'nav.howItWorks': 'How It Works',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'button.createStory': 'Create Story',
    
    // Hero Section
    'hero.title.1': 'Your Child is the',
    'hero.title.2': 'Hero',
    'hero.title.3': 'of the',
    'hero.title.4': 'Adventure!',
    'hero.subtitle': 'Create personalized stories where your child lives incredible adventures through Brazilian culture. Each page is a new discovery full of magic and learning.',
    'button.createNow': 'Create Story Now',
    'button.viewExample': 'View Example',
    'text.families': '+500 happy families',
    'text.rating': '4.9/5 stars',
    'text.pages': '15 Pages',
    'text.adventure': 'Of pure adventure!',
    
    // Featured Story
    'featuredStory.title': 'Our Special Story',
    'featuredStory.subtitle': 'An exciting adventure through Brazilian culture, full of values and discoveries',
    'featuredStory.storyTitle': 'The Great Amazon Rainforest Adventure',
    'featuredStory.description': 'embarks on a magical journey through the Amazon Rainforest, where they meet incredible animals, learn about the importance of nature and discover the true meaning of courage and friendship.',
    'featuredStory.learning.environment': 'Learn about environmental conservation',
    'featuredStory.learning.values': 'Develop values of friendship and courage',
    'featuredStory.learning.culture': 'Explore rich Amazonian culture',
    'button.personalizeStory': 'Personalize This Story',
    'text.format': 'Digital + Print',
    'text.delivery': 'Delivery across Brazil',
    
    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'In just 4 simple steps, you create a unique story for your child',
    'step.1.title': 'Choose the Story',
    'step.1.description': 'Select our Amazon adventure specially created for Brazilian children',
    'step.2.title': 'Upload Photo',
    'step.2.description': 'Upload a clear photo of your child\'s face for personalization',
    'step.3.title': 'Add Details',
    'step.3.description': 'Enter your child\'s name and age for an even more personal experience',
    'step.4.title': 'Generate & Buy',
    'step.4.description': 'Preview your personalized story and choose between digital or print version',
    'button.startNow': 'Start Now - Free to Preview!',
    
    // Pricing
    'pricing.title': 'Choose Your Format',
    'pricing.subtitle': 'Digital for immediate reading or print to keep forever',
    'pricing.digital.title': 'Digital Version',
    'pricing.digital.subtitle': 'Immediate access on any device',
    'pricing.print.title': 'Print + Digital Book',
    'pricing.print.subtitle': 'Premium physical book + digital version',
    'pricing.mostPopular': 'Most Popular',
    'button.chooseDigital': 'Choose Digital',
    'button.choosePrint': 'Choose Print + Digital',
    
    // Reviews
    'reviews.title': 'What Parents Say',
    'reviews.subtitle': 'Real stories from families who have already experienced this magic',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about our personalized books',
    
    // Footer
    'footer.description': 'We create magical stories where your child is the protagonist of incredible adventures through rich Brazilian culture.',
    'footer.product': 'Product',
    'footer.support': 'Support',
    'footer.contact': 'Contact',
    'footer.helpCenter': 'Help Center',
    'footer.terms': 'Terms of Use',
    'footer.privacy': 'Privacy Policy',
    'footer.copyright': '© 2024 YouAreTheHero. All rights reserved.',
    
    // Create Story Page
    'createStory.title': 'Personalize Your Story',
    'createStory.subtitle': 'Let\'s create a unique adventure for your little hero',
    'photoUpload.title': 'Photo Upload',
    'photoUpload.dragDrop': 'Drag and drop photo here',
    'photoUpload.clickSelect': 'or click to select',
    'button.chooseFile': 'Choose File',
    'photoUpload.success': 'Photo uploaded successfully!',
    'photoUpload.clickChange': 'Click to change',
    'photoUpload.tips.title': 'Tips for the best photo:',
    'photoUpload.tips.1': '• Well-lit and clear face',
    'photoUpload.tips.2': '• Looking directly at camera',
    'photoUpload.tips.3': '• No glasses or objects on face',
    'photoUpload.tips.4': '• JPG or PNG format, max 5MB',
    'childDetails.title': 'Child Details',
    'input.childName': 'Child\'s name',
    'input.childName.placeholder': 'e.g. Sofia Anna',
    'input.childAge': 'Age',
    'input.childAge.placeholder': 'Select age',
    'storyPreview.title': 'Personalization Preview',
    'storyPreview.placeholder.1': 'Preview will appear here',
    'storyPreview.placeholder.2': 'after filling in the data',
    'storyPreview.pageIndicator': 'Page 1 of 15',
    'button.generateStory': 'Generate Personalized Story',
    'button.generating': 'Generating Story...',
    'button.proceedCheckout': 'Continue to Checkout',
    
    // Checkout
    'checkout.title': 'Complete Order',
    'checkout.subtitle': 'Fill in your details to complete the purchase of the personalized story',
    'checkout.yourData': 'Your Details',
    'checkout.orderSummary': 'Order Summary',
    'input.customerName': 'Full Name',
    'input.customerEmail': 'Email',
    'input.customerPhone': 'Phone (optional)',
    'checkout.bookFormat': 'Book Format',
    'checkout.digital': 'Digital ($15.00)',
    'checkout.print': 'Print + Digital ($35.00)',
    'checkout.shippingAddress': 'Delivery Address',
    'input.address': 'Address',
    'input.city': 'City',
    'input.state': 'State',
    'input.zipCode': 'ZIP Code',
    'button.createOrder': 'Continue to Payment',
    'button.creating': 'Creating order...',
    'checkout.payment.title': 'Payment',
    'checkout.payment.subtitle': 'Complete your payment securely',
    'button.pay': 'Pay $',
    'button.processing': 'Processing...',
    
    // Toast Messages
    'toast.storyPersonalized': 'Story Personalized!',
    'toast.storyPersonalized.desc': 'Your story was created successfully. Check the preview!',
    'toast.error.personalize': 'Personalization Error',
    'toast.error.personalize.desc': 'Could not personalize the story. Please try again.',
    'toast.nameRequired': 'Name Required',
    'toast.nameRequired.desc': 'Please enter the child\'s name.',
    'toast.ageInvalid': 'Invalid Age',
    'toast.ageInvalid.desc': 'Please select an age between 4 and 8 years.',
    'toast.photoRequired': 'Photo Required',
    'toast.photoRequired.desc': 'Please upload a photo of the child.',
    'toast.paymentSuccess': 'Payment Successful!',
    'toast.paymentSuccess.desc': 'Your book will be processed and sent soon.',
    'toast.paymentError': 'Payment Error',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-br');

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}