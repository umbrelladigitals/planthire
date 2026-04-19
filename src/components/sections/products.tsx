'use client'; // Making this a client component for API requests

import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <section id="products" className="py-24 bg-white border-t border-slate-200">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-4">
                <Truck className="h-4 w-4" /> Professional Equipment
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Featured Fleet
              </h2>
              <p className="text-lg text-slate-600">
                Browse our range of high-quality equipment available for hire. All machinery is regularly serviced and maintained to the highest standards.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <Link href="/products" className="inline-flex items-center justify-center bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-primary hover:text-primary-foreground transition-colors group">
                View Complete Inventory
                <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                <p className="text-center font-medium text-slate-500 uppercase tracking-widest text-sm">Loading Fleet...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center">
              <p className="text-center text-red-600 bg-red-50 py-4 px-6 border border-red-200 font-medium">
                <span className="mr-2">⚠️</span>
                Error loading products: {error}
              </p>
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="flex justify-center py-20">
              <div className="text-center text-slate-400 flex flex-col items-center">
                <Grid className="h-16 w-16 mb-4 text-slate-200" />
                <p className="font-semibold text-slate-500">No equipment available at the moment.</p>
              </div>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
          <Carousel className="w-full group/carousel">
            <CarouselContent className="-ml-6">
                {products.map((product) => (
                  <CarouselItem key={product.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <div className="group h-full flex flex-col bg-slate-50 border border-slate-200 hover:border-slate-800 transition-all duration-500 overflow-hidden">
                      <div className="h-56 relative bg-slate-200 overflow-hidden">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                              <Building className="h-12 w-12 text-slate-300" />
                            </div>
                          )}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 flex items-center uppercase tracking-wider">
                            <Tag className="h-3 w-3 mr-2 text-primary" />
                            Equipment
                          </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow bg-white">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-slate-600 line-clamp-3 leading-relaxed text-sm mb-6 flex-grow">{product.description}</p>
                        
                        <Link href={`/products/${product.id}`} className="mt-auto inline-flex items-center text-sm font-bold text-slate-900 group-hover:text-primary transition-colors uppercase tracking-wider">
                          View Details
                          <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            
            <div className="flex justify-end mt-10 gap-3">
              <CarouselPrevious variant="outline" className="static translate-y-0 translate-x-0 h-12 w-12 rounded-none border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center transition-all bg-transparent" aria-label="Previous" />
              <CarouselNext variant="outline" className="static translate-y-0 translate-x-0 h-12 w-12 rounded-none border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center transition-all bg-transparent" aria-label="Next" />
            </div>
          </Carousel>
          )}
      </div>
    </section>
  );
} 