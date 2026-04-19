"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.error("[Login Page] NextAuth signIn error type:", result.error);
        if (result.error === "CredentialsSignin") {
          setError("Incorrect email or password. Please check your details and try again.");
        } else {
          setError(`An error occurred during sign in. (Error: ${result.error})`);
        }
      } else if (result?.ok) {
        router.push("/panel");
      } else {
        setError("Sign in failed. An unknown error occurred.");
      }
    } catch (err) {
      console.error("[Login Page] handleSubmit catch error:", err);
      setError("An unexpected network error occurred during sign in.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-sm bg-white border-2 border-slate-900">
        <div className="p-6 border-b-2 border-slate-900 bg-slate-50">
          <h1 className="text-2xl font-black uppercase tracking-widest text-slate-900">Panel Login</h1>
          <p className="text-slate-600 font-medium uppercase tracking-wider text-xs mt-2">
            Sign in to access the management panel.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 font-bold uppercase tracking-wider text-xs" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-900 block">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-slate-900 font-medium text-slate-900"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-900 block">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-slate-900 font-medium text-slate-900"
              />
            </div>
          </div>
          <div className="p-6 border-t-2 border-slate-900 bg-slate-50">
            <Button type="submit" className="w-full h-12 rounded-none bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs transition-colors" disabled={loading}>
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 