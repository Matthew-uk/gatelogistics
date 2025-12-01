'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setLoading(true);

      const res = await axios.post('/api/auth/login', data);

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        router.push('/admin/dashboard');
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-poppins">
      <div className="w-full max-w-md bg-white shadow-md px-8 py-10 rounded-xl border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>
            <input
              {...register('email')}
              className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primabg-blue-600 focus:border-primabg-blue-600"
              placeholder="admin@mail.com"
              type="email"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <input
              {...register('password')}
              className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primabg-blue-600 focus:border-primabg-blue-600"
              placeholder="••••••••"
              type="password"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm mt-5 text-gray-600 text-center">
          Don’t have an account?{' '}
          <a
            href="/register"
            className="text-primabg-blue-700 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
