import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturedStory from "@/components/featured-story";
import HowItWorks from "@/components/how-it-works";
import Pricing from "@/components/pricing";
import CustomerReviews from "@/components/customer-reviews";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FeaturedStory />
      <HowItWorks />
      <Pricing />
      <CustomerReviews />
      <FAQ />
      <Footer />
    </div>
  );
}
