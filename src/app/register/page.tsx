"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
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
        setError(result.message || 'An error occurred.');
      } else {
        // Kayıt başarılı, kullanıcıyı giriş sayfasına yönlendir
        router.push('/login');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
      console.error('Registration error:', err);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-widest text-center">Register</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-black uppercase tracking-widest block">Name:</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full h-12 px-4 border-2 border-slate-900 rounded-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            />
            {errors.name && <p className="text-red-500 text-xs font-bold uppercase">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-black uppercase tracking-widest block">Email:</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full h-12 px-4 border-2 border-slate-900 rounded-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            />
            {errors.email && <p className="text-red-500 text-xs font-bold uppercase">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-black uppercase tracking-widest block">Password:</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full h-12 px-4 border-2 border-slate-900 rounded-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            />
            {errors.password && <p className="text-red-500 text-xs font-bold uppercase">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-500 text-xs font-bold uppercase mb-4">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-slate-900 text-white font-black uppercase tracking-widest rounded-none hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
} 