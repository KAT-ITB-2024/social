'use client';

import React, { useState } from 'react';
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
import { ResetPasswordPayload } from '~/types/payloads/auth';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { toast } from 'sonner';
import { SuccessToast } from '~/components/ui/success-toast';
import { TRPCError } from '@trpc/server';

const NewPasswordPage = () => {
  type ResetPasswordPayloadSchema = z.infer<typeof ResetPasswordPayload>;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const form = useForm<ResetPasswordPayloadSchema>({
    resolver: zodResolver(ResetPasswordPayload),
    defaultValues: {
      token: '',
      userId: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const router = useRouter();

  const { isValid } = form.formState;

  const resetPasswordMutation = api.auth.resetPassword.useMutation();

  function onSubmit(values: ResetPasswordPayloadSchema) {
    const { newPassword, confirmPassword } = values;
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const token = urlParams.get('token');
    if (!userId || !token) {
      toast.error('Invalid user id or token!');
      return;
    }

    try {
      resetPasswordMutation.mutate({
        userId,
        token,
        newPassword,
        confirmPassword,
      });
      toast(<SuccessToast desc="Password berhasil diganti!" />);
      router.push('/login');
    } catch (error) {
      if (error instanceof TRPCError) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong, please try again.');
      }
    }
  }

  return (
    <div className="mt-[120px] flex w-full flex-col items-center gap-2">
      <h3 className="text-center text-[60px] text-blue-500">
        Password <br /> Baru
      </h3>
      <p className="text-center font-bold text-blue-500">
        Mari masukkan password baru, Aqualings!
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-20 w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-blue-500">
                  New Password<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="New Password"
                      type={showPassword ? 'text' : 'password'}
                      className="rounded-lg border-2 border-neutral-400 focus-visible:ring-transparent"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
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
                  <FormMessage className="text-red-500">
                    {fieldState.error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-blue-500">
                  Confirm Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="rounded-lg border-2 border-neutral-400 focus-visible:ring-transparent"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                      onClick={toggleShowConfirmPassword}
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
        </form>
      </Form>
    </div>
  );
};

export default NewPasswordPage;
