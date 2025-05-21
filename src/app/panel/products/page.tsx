import { db } from "@/lib/db";
// import { ClientProductForm } from "@/components/panel/client-product-form"; // Removed
import { ProductFormDialog } from "@/components/panel/ProductFormDialog"; // Added
import ProductListPanel, { type Product } from "@/components/panel/product-list-panel";
import { revalidatePath } from "next/cache"; // For revalidating path
// import { type Equipment } from "@prisma/client"; // Equipment tipini import et

// product-list-panel.tsx'den Product arayüzünü import etmek daha iyi bir pratik olurdu.
// Şimdilik, product-list-panel.tsx'deki Product arayüzünün de güncelleneceğini varsayarak devam ediyorum.

export default async function ProductsPage() {
  // Prisma'dan dönen tipin `dailyRate` vb. alanları içerdiğinden emin olmak için
  // `Equipment` modelinin tüm alanlarını içeren bir tip kullanabiliriz ya da
  // `select` sorgusuna göre bir tip oluşturabiliriz. Şimdilik `any` kullanıp
  // map sonrası `Product[]` tipine dönüştüreceğiz.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawProducts: any[] = await db.equipment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products: Product[] = rawProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? null,
    imageUrl: p.imageUrl ?? null,
    dailyRate: p.dailyRate ? p.dailyRate.toString() : null,
    weeklyRate: p.weeklyRate ? p.weeklyRate.toString() : null,
    monthlyRate: p.monthlyRate ? p.monthlyRate.toString() : null,
    available: p.available, 
    createdAt: p.createdAt, // Bu alanlar Product arayüzünde yoksa kaldırılmalı veya eklenmeli
    updatedAt: p.updatedAt, // Bu alanlar Product arayüzünde yoksa kaldırılmalı veya eklenmeli
    specifications: p.specifications ?? null, // Bu alanlar Product arayüzünde yoksa kaldırılmalı veya eklenmeli
  }));

  // Product arayüzünü kontrol edelim. Eğer createdAt, updatedAt, specifications yoksa:
  // const products: Product[] = rawProducts.map((p: any) => ({
  //   id: p.id,
  //   name: p.name,
  //   description: p.description ?? null,
  //   imageUrl: p.imageUrl ?? null,
  //   dailyRate: p.dailyRate ? p.dailyRate.toString() : null,
  //   weeklyRate: p.weeklyRate ? p.weeklyRate.toString() : null,
  //   monthlyRate: p.monthlyRate ? p.monthlyRate.toString() : null,
  //   available: p.available,
  // }));

  // Server action for revalidation
  async function handleFormSubmit() {
    'use server';
    revalidatePath("/panel/products");
    revalidatePath("/panel"); // Also revalidate the main panel page if necessary
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          {/* 
            ProductFormDialog'a `productToEdit` gönderirken, `rawProducts` içinden 
            orijinal Decimal değerlerine sahip olanı göndermek daha doğru olabilir.
            Bu, `ProductFormDialog` bileşeninin `useEffect` ve `onSubmit` içindeki 
            `.toString()` ve `parseFloat` (veya Decimal dönüşümü) mantığını korumasını sağlar.
            Şimdilik `ProductFormDialog`'un `productToEdit` olmadan çağrıldığı durumu (ekleme modu) ele alıyoruz.
            Düzenleme modu için `ProductListPanel` içindeki `ProductFormDialog` çağrısını gözden geçirmek gerekecek.
          */}
          <ProductFormDialog onFormSubmit={handleFormSubmit} />
        </div>
      </div>
      
      {/* Product Management Section */}
      {/* ProductListPanel'e artık string'e dönüştürülmüş productsları veriyoruz */}
      {/* ProductListPanel'in Product arayüzünü de string rate'leri alacak şekilde güncellemek gerekecek */}
      <ProductListPanel products={products} />
    </div>
  );
} 