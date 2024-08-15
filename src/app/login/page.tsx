'use client';

import React from 'react';

// Images Import
import Image from 'next/image';
import OSKMLogo from 'public/images/login/Logo.png';

// Form Import
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

const LoginPage = () => {
  type loginPayloadSchema = z.infer<typeof loginPayload>;
  const router = useRouter();
  const form = useForm<loginPayloadSchema>({
    resolver: zodResolver(loginPayload),
    defaultValues: {
      nim: '',
      password: '',
    },
  });

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
            render={({ field }) => (
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500">
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="focus-visible:ring-transparent border-neutral-400 rounded-lg border-2"
                  />
                </FormControl>
                <FormMessage />
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
              className=" bg-blue-500 hover:bg-blue-400 shadow-lg px-8"
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
