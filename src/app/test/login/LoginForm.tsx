'use client';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '~/types/login/Schema';
import type { z } from 'zod';
import type { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
    const { nim, password } = data;

    await signIn('credentials', {
      redirect: false,
      nim,
      password,
      callbackUrl: '/test',
    }).then((res) => {
      if (res?.error) {
        console.error('Sign in error:', res.error);

        setError('password', {
          type: 'manual',
          message: 'Invalid credentials',
        });
      } else {
        router.push('/test');
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="nim"
              className="block text-sm font-medium text-gray-700"
            >
              NIM
            </label>
            <input
              id="nim"
              type="text"
              {...register('nim')}
              className={`mt-1 block w-full border px-3 py-2 text-black ${
                errors.nim ? 'border-red-500' : 'border-gray-300'
              } rounded-md placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
            />
            {errors.nim && (
              <span className="text-sm text-red-500">{errors.nim.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`mt-1 block w-full border px-3 py-2 text-black ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
