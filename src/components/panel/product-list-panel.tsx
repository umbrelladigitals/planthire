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
  dailyRate: string | null;
  weeklyRate: string | null;
  monthlyRate: string | null;
  available: boolean;
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
            <Card key={product.id} className="flex flex-col justify-between">
              <CardHeader className="p-4 pb-0">
                  {product.imageUrl ? (
                  <div className="relative w-full h-48 overflow-hidden rounded-md bg-gray-100 mb-2">
                       <Image
                        src={product.imageUrl}
                        alt={product.name ?? "Product image"}
                        fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-xs text-gray-500 rounded-md mb-2">
                    No Image
                    </div>
                  )}
                <CardTitle className="text-lg font-semibold leading-none mb-1">{product.name}</CardTitle>
                 <Badge variant={product.available ? 'default' : 'destructive'} className="w-fit">
                   {product.available ? 'Available' : 'Not Available'}
                 </Badge>
              </CardHeader>
              <CardContent className="p-4 pt-2 text-sm text-gray-600 flex-grow">
                <p className="line-clamp-3">{product.description || 'No description provided.'}</p>
                <div className="mt-4 space-y-1">
                   <p><span className="font-semibold">Daily:</span> {product.dailyRate ? `£${product.dailyRate}` : '-'}</p>
                   <p><span className="font-semibold">Weekly:</span> {product.weeklyRate ? `£${product.weeklyRate}` : '-'}</p>
                   <p><span className="font-semibold">Monthly:</span> {product.monthlyRate ? `£${product.monthlyRate}` : '-'}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0">
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