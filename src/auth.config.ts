import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Şifre karşılaştırması için

const prisma = new PrismaClient();

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user || !user.password) {
          return null; // Kullanıcı bulunamadı veya şifresi ayarlanmamış
        }

        // Şifreleri karşılaştır
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid && user.isAdmin) { // Sadece admin kullanıcılar giriş yapabilsin
          return { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin, image: user.image };
        }
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: '/login', // Özel giriş sayfası (opsiyonel)
  // },
  // callbacks: { // İleride JWT veya session callback'lerini buraya ekleyebiliriz
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.isAdmin = (user as any).isAdmin;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       (session.user as any).isAdmin = token.isAdmin;
  //     }
  //     return session;
  //   },
  // },
} satisfies NextAuthConfig; 