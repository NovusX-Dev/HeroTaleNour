import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudUpload, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PhotoUploadProps {
  onDataChange: (data: { childName: string; childAge: number; photo: File | null }) => void;
}

export default function PhotoUpload({ onDataChange }: PhotoUploadProps) {
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState<number | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onDataChange({ childName, childAge: childAge || 0, photo: file });
    }
  }, [childName, childAge, onDataChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const handleNameChange = (value: string) => {
    setChildName(value);
    onDataChange({ childName: value, childAge: childAge || 0, photo });
  };

  const handleAgeChange = (value: string) => {
    const age = parseInt(value);
    setChildAge(age);
    onDataChange({ childName, childAge: age, photo });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="font-poppins text-2xl font-semibold text-foreground">
          Upload da Foto
        </h3>
        
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer bg-white/50 transition-colors ${
            isDragActive ? 'border-primary/50 bg-primary/5' : 'border-primary/30 hover:border-primary/50'
          }`}
          data-testid="photo-dropzone"
        >
          <input {...getInputProps()} data-testid="photo-input" />
          
          {photoPreview ? (
            <div className="space-y-4">
              <img 
                src={photoPreview} 
                alt="Preview" 
                className="w-32 h-32 rounded-full object-cover mx-auto"
                data-testid="photo-preview"
              />
              <p className="text-green-600 font-medium">Foto carregada com sucesso!</p>
              <p className="text-sm text-foreground/70">Clique para alterar</p>
            </div>
          ) : (
            <>
              <CloudUpload className="h-12 w-12 text-primary mb-4 mx-auto" />
              <p className="text-lg font-medium text-foreground mb-2">
                Arraste e solte a foto aqui
              </p>
              <p className="text-foreground/70 mb-4">
                ou clique para selecionar
              </p>
              <Button type="button" className="bg-primary text-white hover:bg-primary/90" data-testid="button-choose-file">
                Escolher Arquivo
              </Button>
            </>
          )}
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-800">
            <p className="font-medium mb-1">Dicas para a melhor foto:</p>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Rosto bem iluminado e claro</li>
              <li>• Olhando diretamente para a câmera</li>
              <li>• Sem óculos ou objetos no rosto</li>
              <li>• Formato JPG ou PNG, máximo 5MB</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        <h4 className="font-poppins text-xl font-semibold text-foreground">
          Detalhes da Criança
        </h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="child-name" className="text-sm font-medium text-foreground">
              Nome da criança
            </Label>
            <Input
              id="child-name"
              type="text" 
              placeholder="Ex: Ana Sofia" 
              value={childName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="mt-2"
              data-testid="input-child-name"
            />
          </div>
          
          <div>
            <Label htmlFor="child-age" className="text-sm font-medium text-foreground">
              Idade
            </Label>
            <Select onValueChange={handleAgeChange} data-testid="select-child-age">
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione a idade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 anos</SelectItem>
                <SelectItem value="5">5 anos</SelectItem>
                <SelectItem value="6">6 anos</SelectItem>
                <SelectItem value="7">7 anos</SelectItem>
                <SelectItem value="8">8 anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
