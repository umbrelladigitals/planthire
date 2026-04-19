'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";

import { Search, Filter, Grid, Loader2, AlertCircle } from "lucide-react";
import ProductList from '@/components/product-list'; // Import the existing ProductList
import { Product } from '@/app/api/products/route'; // Import Product interface
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

function FilteredProductContent() {
  const searchParams = useSearchParams();
  const initialCategoryMatch = searchParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
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

  // Extract unique categories from products
  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    products.forEach(product => {
      if (product.categories && product.categories.length > 0) {
        product.categories.forEach(cat => allCategories.add(cat.name));
      }
    });
    return ['ALL', ...Array.from(allCategories)].sort();
  }, [products]);

  // Set initial category from URL if it exists and matches
  useEffect(() => {
    if (initialCategoryMatch && categories.length > 1) {
      // Find case-insensitive match from URL parameter to DB real category names (e.g. "excavators" -> "Excavators")
      const matchedCategory = categories.find(
        (c) => c.toLowerCase() === initialCategoryMatch.toLowerCase()
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
      }
    }
  }, [initialCategoryMatch, categories]);

  // Filter products based on search term AND category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Search term filter
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // 2. Category filter
      const matchesCategory = selectedCategory === 'ALL' || 
        (product.categories && product.categories.some(cat => cat.name === selectedCategory));

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 border border-slate-200">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="SEARCH EQUIPMENT (E.G. EXCAVATORS)..." 
            className="pl-12 h-14 rounded-none border-slate-300 focus-visible:ring-primary focus-visible:border-primary text-sm font-bold uppercase tracking-wider placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative sm:w-auto w-full">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Filter className="h-4 w-4 text-slate-900" />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-14 w-full sm:w-64 pl-12 pr-10 appearance-none rounded-none border border-slate-300 bg-slate-50 text-slate-900 text-sm font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'ALL' ? 'ALL CATEGORIES' : category.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500">
            ▼
          </div>
        </div>
      </div>

      {/* Loading, Error, or Product List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Loader2 className="h-12 w-12 mb-4 animate-spin text-primary" />
          <p className="font-bold text-slate-500 uppercase tracking-widest text-sm">Synchronizing Fleet Data...</p>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="max-w-md mx-auto rounded-none border-2 border-red-500 bg-red-50">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="font-bold uppercase tracking-wider">Connection Error</AlertTitle>
          <AlertDescription className="font-medium text-red-700">
            {error}
          </AlertDescription>
        </Alert>
      ) : filteredProducts.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-slate-200">
              <Grid className="h-16 w-16 mb-4 text-slate-200" />
              <p className="font-bold text-slate-500 uppercase tracking-widest">No matching equipment found in inventory.</p>
            </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export function FilteredProductList() {
  return (
    <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Loader2 className="h-12 w-12 mb-4 animate-spin text-primary" />
          <p className="font-bold text-slate-500 uppercase tracking-widest text-sm">Loading Application...</p>
        </div>
    }>
      <FilteredProductContent />
    </Suspense>
  )
} 