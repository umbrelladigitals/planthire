import type { Metadata } from "next";
import { ProductsNavbar } from "@/components/products-navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Aberdeenshire Plant Hire",
    default: "Equipment Hire | Aberdeenshire Plant Hire",
  },
};

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