import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StoryPreviewProps {
  personalizedStory: {
    title: string;
    content: Array<{
      pageNumber: number;
      text: string;
      imagePrompt: string;
    }>;
    childName: string;
  } | null;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function StoryPreview({ personalizedStory, onGenerate, isGenerating }: StoryPreviewProps) {
  return (
    <div className="space-y-6">
      <h4 className="font-poppins text-xl font-semibold text-foreground">
        Prévia da Personalização
      </h4>
      
      <div className="bg-white rounded-xl p-6 shadow-lg">
        {personalizedStory ? (
          <>
            <div className="aspect-[3/4] bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500" 
                alt="Story preview with child in Amazon forest" 
                className="rounded-lg w-full h-full object-cover"
                data-testid="img-story-preview"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <Badge className="bg-primary mb-2">Página 1</Badge>
                <p className="text-sm font-medium leading-tight" data-testid="text-preview-story">
                  {personalizedStory.content[0]?.text.substring(0, 80)}...
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-center font-medium text-foreground" data-testid="text-story-title">
                {personalizedStory.title}
              </p>
              
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              
              <p className="text-center text-sm text-foreground/70" data-testid="text-page-indicator">
                Página 1 de 15
              </p>
            </div>
          </>
        ) : (
          <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center text-foreground/50">
              <p className="font-medium">Prévia aparecerá aqui</p>
              <p className="text-sm">após preencher os dados</p>
            </div>
          </div>
        )}
      </div>

      <Button 
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full bg-secondary text-white hover:bg-secondary/90 py-4 rounded-xl font-poppins font-semibold text-lg shadow-lg disabled:opacity-50"
        data-testid="button-generate-story"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Gerando História...
          </>
        ) : (
          <>
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 0 0 18-7-6-7 6z" />
            </svg>
            Gerar História Personalizada
          </>
        )}
      </Button>
    </div>
  );
}
