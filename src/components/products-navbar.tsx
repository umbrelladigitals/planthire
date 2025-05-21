import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetFooter } from "@/components/ui/sheet";
import { Menu, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ProductsNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Site Logosu / Ana Sayfa Linki */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
          <Construction className="h-7 w-7" />
          <span>Plant Hire</span> {/* Buraya site adını ayarlardan çekmek daha iyi olabilir */}
        </Link>
        
        {/* Masaüstü Navigasyon */}
        <nav className="hidden md:flex gap-2">
          {/* Ana Sayfa Linki (Tekrar) - İsteğe bağlı, logo yeterli olabilir */}
          {/* <Button variant="ghost" asChild><Link href="/">Home</Link></Button> */}
          <Button variant="ghost" asChild>
            <Link href="/products">Equipment Catalog</Link>
          </Button>
          {/* Diğer sayfalar veya iletişim gibi bağlantılar eklenebilir */}
          {/* <Button variant="ghost" asChild><Link href="/contact">Contact</Link></Button> */}
        </nav>
        
        {/* Masaüstü İletişim veya Aksiyon Butonu */}
        <div className="hidden md:flex items-center gap-2">
           {/* İletişim veya Teklif İsteği Butonu */}
           <Button asChild>
             <Link href="/contact">Inquire</Link>
           </Button>
        </div>
        
        {/* Mobil Navigasyon */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-sm w-full max-w-[75vw] px-6 py-6 flex flex-col">
            <SheetHeader className="mb-6">
               {/* Mobil Logo / Ana Sayfa Linki */}
               <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                 <Construction className="h-6 w-6" />
                 <span>Site Name</span> {/* Buraya site adını ayarlardan çekmek daha iyi olabilir */}
               </Link>
            </SheetHeader>

            {/* Mobil Ana Navigasyon */}
            <nav className="flex flex-col gap-2 mb-8">
              <Button variant="ghost" asChild className="justify-start h-12 text-base px-2">
                <Link href="/">Home</Link>
              </Button>
               <Button variant="ghost" asChild className="justify-start h-12 text-base px-2">
                 <Link href="/products">Equipment Catalog</Link>
               </Button>
              {/* Diğer mobil bağlantılar */}
              {/* <Button variant="ghost" asChild className="justify-start h-12 text-base px-2"><Link href="/contact">Contact</Link></Button> */}
            </nav>

            <Separator className="my-6" />

            {/* Mobil İletişim Bilgileri - Ayarlardan çekilebilir */}
            {/* Şimdilik placeholder veriler */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Contact Info (Placeholder)</h3>
              <div className="space-y-3 pl-1 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span>+44 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span>info@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>Location Placeholder, UK</span>
                </div>
              </div>
            </div>

            {/* Mobil Sosyal Medya - Ayarlardan çekilebilir */}
             {/* Şimdilik placeholder veriler */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Follow Us (Placeholder)</h3>
              <div className="flex gap-4 pl-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></Link>
                </Button>
              </div>
            </div>

            <SheetFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href="/contact">Inquire</Link>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
} 