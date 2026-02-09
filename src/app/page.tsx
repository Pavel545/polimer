import About from "@/components/section/about/about";
import Contact from "@/components/section/contact/contact";
import Geography from "@/components/section/geography/geography";
import Hero from "@/components/section/hero/hero";
import Products from "@/components/section/products/products";
import Reviews from "@/components/section/reviews/reviews";

export default function Home() {
  return (
   <main >
      <Hero/>
      <Products/>
      <About/>
      <Geography/>
      <Reviews/>
      <Contact/>
   </main>
  );
}
