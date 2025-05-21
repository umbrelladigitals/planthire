import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/api/products/route'; // Import Product interface
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveRight, Building, Tag, PlusCircle, XCircle, CheckCircle } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Building className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h3 className="text-xl font-medium mb-2">No Equipment Found</h3>
        <p className="text-muted-foreground mb-6">Currently there are no equipment available for hire.</p>
        <Button variant="outline" asChild>
          <Link href="/#contact" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Request Custom Equipment
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className={`overflow-hidden h-full flex flex-col border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 ${!product.available ? 'opacity-75' : ''}`}
        >
          <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
            {product.imageUrl ? (
              <Image 
                src={product.imageUrl} 
                alt={product.name || 'Equipment Image'} 
                fill 
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Building className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
            <Badge variant="secondary" className="absolute top-2 right-2 opacity-90">
              <Tag className="h-3 w-3 mr-1" />
              Equipment
            </Badge>
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            )}
            <div className={`flex items-center mt-3 text-sm ${product.available ? 'text-green-600' : 'text-red-600'}`}>
              {product.available ? 
                <CheckCircle className="h-4 w-4 mr-1.5 flex-shrink-0" /> : 
                <XCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
              }
              <span>{product.available ? 'Available for immediate hire' : 'Currently not available'}</span>
            </div>
          </CardContent>
          <CardFooter className="px-4 pb-4 pt-0">
            <Button asChild variant="outline" className="w-full group">
              <Link href={`/products/${product.id}`} className="flex items-center justify-center">
                View Details
                <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 