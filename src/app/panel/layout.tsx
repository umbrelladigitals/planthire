import { auth } from "@/auth";
import { PanelHeader } from "@/components/panel/panel-header";
import { redirect } from "next/navigation";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PanelHeader user={session.user} />
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 