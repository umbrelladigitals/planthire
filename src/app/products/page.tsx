import type { Metadata } from "next";
import { FilteredProductList } from '@/components/filtered-product-list';
import { 
  PackageOpen, 
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';
import { getGeneralSettings } from "@/lib/settings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aberdeenshireplanthire.co.uk";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGeneralSettings();
  const siteName = settings?.siteName || "Aberdeenshire Plant Hire";

  const title = "Equipment Catalog – Complete Fleet Inventory";
  const description = `Browse the complete plant hire fleet from ${siteName}. Excavators, dumpers, rollers, telehandlers and more available for hire across Aberdeenshire.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/products`,
      title,
      description,
    },
  };
}

export default async function ProductsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 border-t border-slate-200">
      <div className="container">
        {/* Header Block */}
        <div className="mb-12 border-b border-slate-200 pb-8">
          <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-4">
              <PackageOpen className="h-4 w-4" /> Equipment Catalog
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Complete Fleet Inventory</h1>
          </div>
        </div>

        {/* Catalog Content */}
        <FilteredProductList />
      </div>
    </div>
  );
} 