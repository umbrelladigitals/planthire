import { Product } from "@/app/api/products/route";

export async function fetchProducts(): Promise<Product[]> {
  console.log('Attempting to fetch products...');
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, { cache: 'no-store' });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Failed to fetch products:', res.status, res.statusText);
    throw new Error('Failed to fetch products');
  }

  console.log('Products fetched successfully.');
  return res.json();
} 