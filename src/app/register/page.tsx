"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(2, { message: "Ad en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Bir hata oluştu.');
      } else {
        // Kayıt başarılı, kullanıcıyı giriş sayfasına yönlendir
        router.push('/login');
      }
    } catch (err) {
      setError('Bir ağ hatası oluştu. Lütfen tekrar deneyin.');
      console.error('Kayıt hatası:', err);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Adınız:</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.name && <p style={{ color: 'red', fontSize: '0.9em' }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">E-posta:</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.9em' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Şifre:</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '0.9em' }}>{errors.password.message}</p>}
        </div>

        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%', 
            padding: '10px', 
            backgroundColor: isLoading ? '#ccc' : '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
        </button>
      </form>
    </div>
  );
} 