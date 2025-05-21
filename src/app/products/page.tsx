import { FilteredProductList } from '@/components/filtered-product-list';
import { 
  PackageOpen, 
  ArrowLeft 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

export default async function ProductsPage() {
  return (
    <div className="container px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Home
          </Link>
          <div>
            <Badge className="mb-1 px-3 py-1" variant="outline">
              <PackageOpen className="h-3.5 w-3.5 mr-1.5" />
              Equipment List
            </Badge>
            <h1 className="text-3xl font-bold">Our Equipment for Hire</h1>
          </div>
        </div>

        <FilteredProductList />
      </div>
    </div>
  );
} 