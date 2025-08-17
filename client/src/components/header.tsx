import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-primary/10 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
            <div className="bg-primary rounded-full p-2">
              <BookOpen className="text-white text-xl" />
            </div>
            <span className="font-fredoka text-2xl text-primary">YouAreTheHero</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#stories" className="text-foreground hover:text-primary transition-colors" data-testid="nav-stories">
              Histórias
            </Link>
            <Link href="/#how-it-works" className="text-foreground hover:text-primary transition-colors" data-testid="nav-how-it-works">
              Como Funciona
            </Link>
            <Link href="/#pricing" className="text-foreground hover:text-primary transition-colors" data-testid="nav-pricing">
              Preços
            </Link>
            <Link href="/#faq" className="text-foreground hover:text-primary transition-colors" data-testid="nav-faq">
              FAQ
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Select defaultValue="pt-br">
              <SelectTrigger className="w-32" data-testid="language-selector">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-br">🇧🇷 Português</SelectItem>
                <SelectItem value="en-us">🇺🇸 English</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/create-story">
              <Button className="bg-primary text-white hover:bg-primary/90 font-medium" data-testid="button-create-story">
                Criar História
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
