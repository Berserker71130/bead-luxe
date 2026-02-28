import Navbar from "@/components/shop/Navbar";
import HeroSection from "../../components/shop/HeroSection";
import CategoryStrip from "../../components/shop/CategoryStrip";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import NewArrivalsCarousel from "@/components/shop/NewArrivalsCarousel";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CategoryStrip />
      <NewArrivalsCarousel />
      <FeaturedProducts />
    </main>
  );
}
