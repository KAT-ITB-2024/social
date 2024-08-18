'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import OSKMLogo from 'public/images/login/Logo.png';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginPayload } from '~/types/payloads/login';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SuccessToast } from '~/components/ui/success-toast';
import { LoadingSpinner } from '~/components/loading';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

const LoginPage = () => {
  type loginPayloadSchema = z.infer<typeof loginPayload>;
  const router = useRouter();
  const form = useForm<loginPayloadSchema>({
    resolver: zodResolver(loginPayload),
    defaultValues: {
      nim: '',
      password: '',
    },
    mode: 'onChange', // Enables validation on change
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { isValid } = form.formState;

  const toggleShowPassword = () => setShowPassword(!showPassword);

  async function onSubmit(values: loginPayloadSchema) {
    const { nim, password } = values;

    await signIn('credentials', {
      redirect: false,
      nim,
      password,
      callbackUrl: '/',
    }).then((res) => {
      if (res?.error) {
        console.error('Sign in error:', res.error);
        toast.error(res.error);
      } else {
        toast(
          <SuccessToast title="Login success!" desc="Logged in successfully" />,
        );
        router.push('/');
      }
    });
  }

  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }

  return (
    <div className="mt-[120px] w-full flex flex-col items-center">
      <Image src={OSKMLogo} alt="Logo OSKM" width={100} height={100} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 z-20 w-full"
        >
          <FormField
            control={form.control}
            name="nim"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-blue-500">
                  NIM <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="NIM"
                    className="focus-visible:ring-transparent border-neutral-400 rounded-lg border-2"
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-blue-500">
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Password"
                      className="focus-visible:ring-transparent border-neutral-400 rounded-lg border-2"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={toggleShowPassword}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1201_1296)">
                          <path
                            d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 8.74 9.24 6.5 12 6.5C14.76 6.5 17 8.74 17 11.5C17 14.26 14.76 16.5 12 16.5ZM12 8.5C10.34 8.5 9 9.84 9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5C15 9.84 13.66 8.5 12 8.5Z"
                            fill="#9EA2AD"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1201_1296">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <Link
            href="/login/forgot-password"
            className="underline text-start text-[12px] text-blue-500"
          >
            Lupa Password?
          </Link>
          <div className="py-2" />
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 shadow-lg px-8"
              disabled={!isValid}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
