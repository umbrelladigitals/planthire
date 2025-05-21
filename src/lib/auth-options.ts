import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig, User as DefaultUser, Session, Account, Profile } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";

interface AuthorizeUser extends DefaultUser {
  id: string;
  isAdmin?: boolean;
}

// NextAuthConfig tipini kullanarak yapılandırmamızı tanımlıyoruz
export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthorizeUser | null> {
        console.log("[Auth Config] Authorize: Giriş denemesi başladı. E-posta:", { email: credentials?.email });
        if (typeof credentials?.email !== 'string' || typeof credentials.password !== 'string') {
          console.error("[Auth Config] Authorize: Geçersiz kimlik bilgisi formatı.");
          return null;
        }
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          console.warn(`[Auth Config] Authorize: Kullanıcı bulunamadı. E-posta: ${credentials.email}`);
          return null;
        }
        if (typeof user.password !== 'string') {
          console.warn(`[Auth Config] Authorize: Kullanıcının şifresi ayarlanmamış veya string değil. E-posta: ${user.email}`);
          return null;
        }
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          console.warn(`[Auth Config] Authorize: Geçersiz şifre. E-posta: ${user.email}`);
          return null;
        }
        console.log(`[Auth Config] Authorize: Şifre geçerli. E-posta: ${user.email}. Kullanıcı objesi döndürülüyor.`);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: DefaultUser | AdapterUser | AuthorizeUser; account?: Account | null; profile?: Profile; trigger?: "signIn" | "signUp" | "update"; isNewUser?: boolean; }): Promise<JWT> {
      if (user && user.id) {
        token.id = user.id;
        if ((user as AuthorizeUser).isAdmin !== undefined) {
          token.isAdmin = (user as AuthorizeUser).isAdmin;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token?.id && session?.user) {
        session.user.id = token.id as string;
        if (token.isAdmin !== undefined && session.user) {
          (session.user as AuthorizeUser).isAdmin = token.isAdmin as boolean;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // error: '/api/auth/error', // NextAuth v5 bunu otomatik yönetir veya farklı bir yaklaşım sunar
  },
  // secret: process.env.NEXTAUTH_SECRET, // NextAuth v5'te bu genellikle framework tarafından yönetilir veya config'e dahil edilir.
                                        // .env.local içinde NEXTAUTH_SECRET olması hala iyi bir pratiktir.
  trustHost: true, // Geliştirme ortamında ve bazı deploymentlarda gerekebilir.
};

// NextAuth fonksiyonunu config ile çağırıp handlerları ve diğer yardımcıları alıyoruz
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig); 