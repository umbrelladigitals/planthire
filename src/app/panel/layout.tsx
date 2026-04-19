import type { Metadata } from "next";
import { auth } from "@/auth";
import { PanelHeader } from "@/components/panel/panel-header";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin Panel",
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Kullanıcı oturum açmamışsa login sayfasına yönlendir
  if (!session?.user) {
    redirect("/login");
  }

  // Kullanıcı admin değilse ana sayfaya yönlendir
  if (!session.user.isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary selection:text-white">
      <PanelHeader user={session.user} />
      
      <main className="container mx-auto px-4 py-12">
        {children}
      </main>
    </div>
  );
} 