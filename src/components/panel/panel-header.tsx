'use client';

import Link from "next/link";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Package, 
  Image, 
  Mail, 
  Settings, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

interface PanelHeaderProps {
  user: User;
}

export function PanelHeader({ user }: PanelHeaderProps) {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/panel", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { href: "/panel/products", label: "Products", icon: <Package className="h-4 w-4 mr-2" /> },
    { href: "/panel/gallery", label: "Gallery", icon: <Image className="h-4 w-4 mr-2" /> },
    { href: "/panel/contacts", label: "Contact Requests", icon: <Mail className="h-4 w-4 mr-2" /> },
    { href: "/panel/settings", label: "Settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900 border-b border-slate-800 text-white">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link href="/panel" className="flex items-center space-x-3 text-white hover:text-primary transition-colors">
            <Package className="h-6 w-6" />
            <span className="hidden font-black tracking-widest uppercase sm:inline-block">
              PlantHire
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={`rounded-none h-16 flex items-center px-4 transition-colors font-bold uppercase tracking-wider text-xs ${
                pathname === item.href 
                  ? "bg-slate-800 text-white border-b-2 border-primary" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
              asChild
            >
              <Link href={item.href} className="flex items-center">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-none border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
                <Avatar className="h-8 w-8 rounded-none">
                  <AvatarImage src={user.image || undefined} alt={user.name || "User Avatar"} />
                  <AvatarFallback className="rounded-none bg-primary text-white font-bold">{user.name?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 rounded-none border-slate-200 bg-white" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-4 bg-slate-50 border-b border-slate-100">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-slate-900">{user.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              
              {/* Mobile navigation for small screens */}
              <div className="md:hidden p-2">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="rounded-none font-bold uppercase text-xs tracking-wider text-slate-600 focus:bg-slate-100 focus:text-slate-900 cursor-pointer py-3">
                    <Link href={item.href} className="flex items-center">
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-slate-100" />
              </div>
              
              <div className="p-2">
                <DropdownMenuItem 
                  className="text-white bg-red-600 focus:bg-red-700 focus:text-white rounded-none cursor-pointer py-3 font-bold uppercase text-xs tracking-wider justify-center transition-colors"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Session Logout</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 