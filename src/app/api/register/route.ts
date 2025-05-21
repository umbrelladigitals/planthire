import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

const prisma = new PrismaClient();

const registerSchema = z.object({
  name: z.string().min(2, { message: "Ad en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Geçersiz giriş verileri.', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    // E-postanın zaten var olup olmadığını kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kayıtlı.' },
        { status: 409 } // Conflict
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı oluştur
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // Modelinizde başka zorunlu alanlar varsa (örn: emailVerified) varsayılan değerlerini burada atayabilirsiniz.
        // Örneğin: emailVerified: null, // veya new Date() eğer otomatik doğrulanmışsa
      },
    });

    // Döndürülen kullanıcı objesinden hassas bilgileri (örn: şifre) çıkarın
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: extractedPassword, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: 'Kullanıcı başarıyla oluşturuldu.', user: userWithoutPassword },
      { status: 201 } // Created
    );

  } catch (error) {
    console.error('[REGISTER_POST_ERROR]', error);
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
} 