"use client"; // Form etkileşimi için client component

import { signIn } from "next-auth/react"; // Client tarafında signIn için
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Yönlendirme için

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false, // Hata durumunda manuel yönlendirme için
        email,
        password,
      });

      if (result?.error) {
        console.error("[Login Page] NextAuth signIn error type:", result.error);
        if (result.error === "CredentialsSignin") {
          setError("E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.");
        } else {
          // Diğer NextAuth hataları veya authorize fonksiyonu içindeki beklenmedik bir durum
          setError(`Giriş sırasında bir hata oluştu. (Hata: ${result.error})`);
        }
      } else if (result?.ok) {
        // Başarılı giriş sonrası /panel'e yönlendir
        router.push("/panel");
      } else {
        // result.ok false ve result.error null ise (genellikle olmaz ama tedbir)
        setError("Giriş yapılamadı. Bilinmeyen bir hata oluştu.");
      }
    } catch (err) {
      console.error("[Login Page] handleSubmit catch error:", err);
      setError("Giriş işlemi sırasında beklenmedik bir ağ hatası oluştu.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Panel Girişi</CardTitle>
          <CardDescription>Yönetim paneline erişmek için giriş yapın.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 