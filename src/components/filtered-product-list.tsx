'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, Loader2, AlertCircle } from "lucide-react";
import ProductList from '@/components/product-list'; // Import the existing ProductList
import { Product } from '@/app/api/products/route'; // Import Product interface
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

export function FilteredProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products`);
        
        if (!res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const errorData = await res.json();
            throw new Error(errorData.error || `Failed to fetch products: ${res.status} ${res.statusText}`);
          } else {
            const text = await res.text();
            console.error("Non-JSON error response:", text);
            throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
          }
        }
        
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search equipment..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Filter Button (currently disabled, can be implemented later) */}
        <Button variant="outline" disabled className="sm:w-auto w-full flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Loading, Error, or Product List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <Loader2 className="h-12 w-12 mb-3 animate-spin" />
          <p>Loading equipment...</p>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      ) : filteredProducts.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Grid className="h-12 w-12 mb-3 text-muted-foreground/70" />
              <p>No matching equipment found.</p>
            </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
} 