import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/sections/gallery";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
