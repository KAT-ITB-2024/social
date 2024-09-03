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
import { toast } from 'sonner';
import { ErrorToast } from '~/components/ui/error-toast';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

const ForgotPasswordPage = () => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  type RequestResetPasswordPayloadSchema = z.infer<
    typeof RequestResetPasswordPayload
  >;
  const requestResetPasswordMutation =
    api.auth.requestResetPassword.useMutation({
      onError: (err) => {
        if (err.data?.code === 'NOT_FOUND') {
          toast(
            <ErrorToast desc="Pastikan kamu sudah mengisi email di profilemu!" />,
          );
        }
        setIsLoading(false);
      },
      onSuccess: () => {
        setIsAlertOpen(true);
        setIsLoading(false);
      },
    });

  const form = useForm<RequestResetPasswordPayloadSchema>({
    resolver: zodResolver(RequestResetPasswordPayload),
    defaultValues: {
      email: '',
    },
    mode: 'onChange', // Enables validation on change
  });

  const { isValid } = form.formState;

  function onSubmit(values: RequestResetPasswordPayloadSchema) {
    setIsLoading(true);
    const { email } = values;
    requestResetPasswordMutation.mutate({
      email,
    });
    setIsAlertOpen(true);
  }

  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }

  return (
    <div className="mt-[150px] flex w-full flex-col items-center gap-2">
      <h3 className="text-center text-[60px] text-blue-500">
        Lupa <br /> Password?
      </h3>
      <p className="text-center font-bold text-blue-500">
        Jangan Khawatir, Aqualings!
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-20 w-full space-y-2"
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
                    className="rounded-lg border-2 border-neutral-400 focus-visible:ring-transparent"
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
          <div className="flex w-full justify-center">
            <Button
              type="submit"
              className="bg-blue-500 px-8 shadow-lg hover:bg-blue-400"
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
            className="flex flex-col items-center border-none bg-blue-500 text-center text-yellow"
          />
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
