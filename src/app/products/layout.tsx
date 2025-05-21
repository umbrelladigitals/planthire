import { ProductsNavbar } from "@/components/products-navbar";
import { Footer } from "@/components/footer";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <>
      <ProductsNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
} 