import { db } from "@/lib/db";
import { ProductFormDialog } from "@/components/panel/ProductFormDialog"; 
import ProductListPanel, { type Product } from "@/components/panel/product-list-panel";
import { revalidatePath } from "next/cache";
import { AdminPageHeader } from "@/components/panel/admin-page-header";

export default async function ProductsPage() {
  const rawProducts = await db.equipment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      EquipmentCategory: true,
    }
  });

  const products: Product[] = rawProducts.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? null,
    imageUrl: p.imageUrl ?? null,
    available: p.available, 
    categoryId: p.EquipmentCategory.length > 0 ? p.EquipmentCategory[0].categoryId : null,
  }));

  // Server action for revalidation
  async function handleFormSubmit() {
    'use server';
    revalidatePath("/panel/products");
    revalidatePath("/panel"); 
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="FLEET DIRECTORY"
        description="Register, modify and deploy machines in the fleet."
        action={<ProductFormDialog onFormSubmit={handleFormSubmit} />}
      />
      
      <ProductListPanel products={products} />
    </div>
  );
} 