import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetFooter } from "./ui/sheet";
import { Menu, Construction, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Separator } from "./ui/separator";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
          <Construction className="h-7 w-7" />
          <span>Abeerbeednshire Plant Hire</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="#services">Services</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#products">Equipment</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
        </nav>
        
        <div className="hidden md:flex items-center gap-2">
          <Button asChild>
            <Link href="#contact">Get a Quote</Link>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-sm w-full max-w-[75vw] px-6 py-6 flex flex-col">
            <SheetHeader className="mb-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                <Construction className="h-6 w-6" />
                <span>Abeerbeednshire Plant Hire</span>
              </Link>
            </SheetHeader>

            {/* Ana Navigasyon */}
            <nav className="flex flex-col gap-2 mb-8">
              <Button variant="ghost" asChild className="justify-start h-12 text-base px-2">
                <Link href="#services">Services</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start h-12 text-base px-2">
                <Link href="#about">About</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start h-12 text-base px-2">
                <Link href="#products">Equipment</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start h-12 text-base px-2">
                <Link href="#contact">Contact</Link>
              </Button>
            </nav>

            <Separator className="my-6" />

            {/* İletişim Bilgileri */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Contact Us</h3>
              <div className="space-y-3 pl-1">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5" />
                  <span>+44 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5" />
                  <span>info@abeerbeednshire.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>Abeerbeednshire, UK</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Sosyal Medya */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Follow Us</h3>
              <div className="flex gap-4 pl-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <SheetFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href="#contact">Get a Quote</Link>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
} 