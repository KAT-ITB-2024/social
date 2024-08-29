'use client';

import React, { useState } from 'react';

// Form Import
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { RequestResetPasswordPayload } from '~/types/payloads/auth';

// Image Import
import Starfish from 'public/images/login/Starfish.png';

// Component Import
import InfoModal from '~/components/InfoModal';
import { api } from '~/trpc/react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

const ForgotPasswordPage = () => {
  const { data: session, status } = useSession();

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  type RequestResetPasswordPayloadSchema = z.infer<
    typeof RequestResetPasswordPayload
  >;
  const requestResetPasswordMutation =
    api.auth.requestResetPassword.useMutation();

  const form = useForm<RequestResetPasswordPayloadSchema>({
    resolver: zodResolver(RequestResetPasswordPayload),
    defaultValues: {
      email: '',
    },
    mode: 'onChange', // Enables validation on change
  });

  const { isValid } = form.formState;

  function onSubmit(values: RequestResetPasswordPayloadSchema) {
    const { email } = values;
    requestResetPasswordMutation.mutate({
      email,
    });
    setIsAlertOpen(true);
  }

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session) {
    redirect('/login');
  }

  return (
    <div className="mt-[150px] flex flex-col gap-2 w-full items-center">
      <h3 className="text-[60px] text-blue-500 text-center">
        Lupa <br /> Password?
      </h3>
      <p className="text-blue-500 font-bold text-center">
        Jangan Khawatir, Aqualings!
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 z-20 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-blue-500">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                    type="email"
                    className="focus-visible:ring-transparent border-neutral-400 rounded-lg border-2"
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage className="text-red-500">
                    {fieldState.error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="py-2" />
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-400 shadow-lg px-8"
              disabled={!isValid}
            >
              Send
            </Button>
          </div>

          <InfoModal
            image={Starfish}
            title="Email Terkirim"
            description="Cek email mu Aqualings, untuk mengubah password!"
            isOpen={isAlertOpen}
            setIsOpen={setIsAlertOpen}
            className="bg-blue-500 flex flex-col items-center border-none text-yellow text-center"
          />
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
