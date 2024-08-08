import { createTRPCRouter, publicProcedure } from '../trpc';
import { generateHash, generateResetToken } from '~/utils/auth';
import { TRPCError } from '@trpc/server';
import { env } from '~/env.js';
import { users, resetTokens } from '@katitb2024/database';
import { eq, and } from 'drizzle-orm';
import {
  RequestResetPasswordPayload,
  ResetPasswordPayload,
} from '~/types/payloads/auth';
import { transporter } from '~/server/mail';

export const authRouter = createTRPCRouter({
  requestResetPassword: publicProcedure
    .input(RequestResetPasswordPayload)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .execute();

      if (!user || user.length === 0) {
        throw new TRPCError({
          message: 'Email anda tidak terdaftar di sistem!',
          code: 'BAD_REQUEST',
        });
      }

      const { hashedToken } = await generateResetToken();
      const userData = user[0];
      const userId = userData?.id;

      if (!userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User ID tidak ditemukan!',
        });
      }

      if (!userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User ID tidak ditemukan!',
        });
      }

      // Delete existing reset token for the user if it exists
      await ctx.db
        .delete(resetTokens)
        .where(eq(resetTokens.userId, userId))
        .execute();

      // Insert new reset token
      await ctx.db
        .insert(resetTokens)
        .values({
          userId: userId,
          value: hashedToken,
          createdAt: new Date(),
          expiredTime: Math.floor(Date.now() / 1000) + 3600, // Convert expiry time to Unix timestamp
        })
        .execute();

      const resetURL = `${env.NEXT_PUBLIC_API_URL}/reset-password?userId=${userId}&token=${hashedToken}`;
      const emailBody = `
            <html>
              <body>
                <p>Hello ${userData.nim},</p>
                <p>You have requested to reset your password. Click the link below to reset your password:</p>
                <a href="${resetURL}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you did not request this, please ignore this email.</p>
              </body>
            </html>
          `;

      await transporter.sendMail({
        from: env.SMTP_USER,
        to: input.email,
        subject: 'Reset your OSKM password',
        html: emailBody,
      });

      return 'Email telah dikirim!';
    }),

  resetPassword: publicProcedure
    .input(ResetPasswordPayload)
    .mutation(async ({ ctx, input }) => {
      const tokenData = await ctx.db
        .select()
        .from(resetTokens)
        .where(
          and(
            eq(resetTokens.userId, input.userId),
            eq(resetTokens.value, input.token),
          ),
        )
        .execute();

      if (!tokenData || tokenData.length === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Token tidak valid atau user tidak ditemukan!',
        });
      }

      const token = tokenData[0];
      if (!token?.expiredTime) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Token tidak valid!',
        });
      }

      const currentTime = Math.floor(Date.now() / 1000); // Convert current time to Unix timestamp

      if (currentTime > token.expiredTime) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Token sudah expired!',
        });
      }

      await ctx.db
        .update(users)
        .set({
          password: await generateHash(input.newPassword),
        })
        .where(eq(users.id, input.userId))
        .execute();

      // Remove the used reset token from the resetTokens table
      await ctx.db
        .delete(resetTokens)
        .where(eq(resetTokens.userId, input.userId))
        .execute();

      return 'Password telah diubah!';
    }),
});
