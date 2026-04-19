'use client';

import Image from "next/image";
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { ProductFormDialog } from "./ProductFormDialog";
import { ProductDeleteButton } from "./product-delete-button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  available: boolean;
  categoryId?: string | null;
}

interface ProductListPanelProps {
  products: Product[];
}

export default function ProductListPanel({ products }: ProductListPanelProps) {
  const router = useRouter();

  const handleFormSubmit = () => {
    router.refresh();
  };

  return (
    <section className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
      </div>

      {products.length === 0 ? (
        <p className="text-muted-foreground text-center">No products found. Start by adding a new product.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
            <Card key={product.id} className="flex flex-col justify-between rounded-none border-2 border-slate-900 bg-white overflow-hidden transition-colors hover:bg-slate-50">
              <CardHeader className="p-0 pb-0 border-b-2 border-slate-900">
                  {product.imageUrl ? (
                  <div className="relative w-full h-48 bg-slate-100 border-b-2 border-slate-900 group">
                       <Image
                        src={product.imageUrl}
                        alt={product.name ?? "Product image"}
                        fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-slate-100 border-b-2 border-slate-900 border-dashed text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">
                    NO IMAGE ASSET
                    </div>
                  )}
                <div className="p-4 bg-slate-50 flex flex-col items-start gap-2">
                  <Badge variant={product.available ? 'default' : 'destructive'} className="w-fit rounded-none uppercase font-black tracking-widest text-[10px] px-2 py-0.5">
                    {product.available ? '● DEPLOYABLE' : '■ OUT OF SERVICE'}
                  </Badge>
                  <CardTitle className="text-xl font-black uppercase tracking-widest text-slate-900">{product.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-4 text-xs font-semibold text-slate-600 flex-grow bg-white">
                <p className="line-clamp-3 uppercase tracking-wider">{product.description || 'NO SPECIFICATIONS LISTED.'}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0 bg-white border-t-2 border-slate-100 mt-2">
                <ProductFormDialog productToEdit={product} onFormSubmit={handleFormSubmit} />
                  <ProductDeleteButton productId={product.id} productName={product.name} />
              </CardFooter>
            </Card>
            ))}
        </div>
      )}
    </section>
  );
} 