import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/api/products/route'; // Import Product interface
import { Button } from "@/components/ui/button";
import { MoveRight, Building, Tag, PlusCircle, XCircle, CheckCircle } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-slate-200">
        <Building className="h-16 w-16 text-slate-200 mb-4" />
        <h3 className="text-xl font-extrabold text-slate-900 mb-2 uppercase tracking-wide">No Equipment Found</h3>
        <p className="text-slate-500 mb-8 font-medium">Currently there is no equipment available matching your criteria.</p>
        <Button asChild className="h-14 rounded-none bg-slate-900 hover:bg-primary text-white font-bold uppercase tracking-widest px-8">
          <Link href="/#contact" className="flex items-center gap-3">
            <PlusCircle className="h-5 w-5" />
            Request Custom Equipment
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div 
          key={product.id} 
          className={`group flex flex-col bg-white border border-slate-200 hover:border-slate-800 transition-all duration-500 overflow-hidden ${!product.available ? 'opacity-80 grayscale-[20%]' : ''}`}
        >
          <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
            {product.imageUrl ? (
              <Image 
                src={product.imageUrl} 
                alt={product.name || 'Equipment Image'} 
                fill 
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Building className="h-16 w-16" />
              </div>
            )}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-3 py-1 flex items-center uppercase tracking-wider">
              <Tag className="h-3 w-3 mr-2 text-primary" />
              Equipment
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-grow">{product.description}</p>
            )}
            
            <div className={`flex items-center text-xs font-bold uppercase tracking-wider mt-auto mb-6 ${product.available ? 'text-green-600' : 'text-red-500'}`}>
              {product.available ? 
                <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" /> : 
                <XCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              }
              <span>{product.available ? 'Ready For Hire' : 'In Service'}</span>
            </div>
            
            <Link 
               href={`/products/${product.id}`} 
               className="inline-flex items-center text-sm font-bold text-slate-900 group-hover:text-primary transition-colors uppercase tracking-wider border-t border-slate-100 pt-4"
            >
              View Specifications
              <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 