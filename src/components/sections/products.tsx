'use client'; // Making this a client component for API requests

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { 
  Building,
  MoveRight, 
  Tag, 
  Truck, 
  Grid, 
  Loader2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Product schema from API
interface Product {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
             const errorData = await response.json();
             throw new Error(errorData.error || `Failed to fetch products: ${response.status} ${response.statusText}`);
          } else {
             throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
          }
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        console.error("Error fetching products:", err);
        setProducts([]); // Empty products in case of error
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-16 md:py-24 bg-muted/20">
      <div className="container px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-3 px-3 py-1" variant="outline">
              <Truck className="h-3.5 w-3.5 mr-1.5" />
              Professional Equipment
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Equipment for Hire</h2>
            <p className="text-lg text-muted-foreground">
              Browse our range of high-quality equipment available for hire. All machinery is regularly serviced and maintained to the highest standards.
            </p>
          </div>

          {/* View All Equipment Button */}
          <div className="text-center mb-16">
            <Button size="lg" asChild className="group">
              <Link href="/products" className="flex items-center">
                View All Equipment
                <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {isLoading && (
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                <p className="text-center text-muted-foreground">Loading products...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center">
              <p className="text-center text-red-500 flex items-center">
                <span className="mr-2">⚠️</span>
                Error loading products: {error}
              </p>
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="flex justify-center">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <Grid className="h-12 w-12 mb-3 text-muted-foreground/70" />
                <p>No products available at the moment.</p>
              </div>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
                {products.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden h-full flex flex-col border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 relative bg-zinc-100">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <Building className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                        )}
                      <Badge variant="secondary" className="absolute top-2 right-2 opacity-90">
                        <Tag className="h-3 w-3 mr-1" />
                        Equipment
                      </Badge>
                    </div>
                    <CardContent className="pt-6 flex-grow">
                      <CardTitle className="mb-2 flex items-center">
                        {product.name}
                      </CardTitle>
                      <p className="text-muted-foreground line-clamp-3">{product.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0 pb-6">
                      <Button asChild variant="outline" className="w-full group">
                        <Link href={`/products/${product.id}`} className="flex items-center justify-center">
                          View Details
                          <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious variant="outline" size="icon" className="rounded-full relative static h-5 w-5" aria-label="Previous" />
              <CarouselNext variant="outline" size="icon" className="rounded-full relative static h-5 w-5" aria-label="Next" />
            </div>
          </Carousel>
          )}
        </div>
      </div>
    </section>
  );
} 