import Navbar from "@/components/shop/Navbar";
import HeroSection from "../../components/shop/HeroSection";
import CategoryStrip from "../../components/shop/CategoryStrip";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import NewArrivalsCarousel from "@/components/shop/NewArrivalsCarousel";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden w-full">
      <Navbar />
      <HeroSection />
      <CategoryStrip />
      <NewArrivalsCarousel />
      <FeaturedProducts />
    </main>
  );
}
