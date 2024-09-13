import { schedule } from 'node-cron';
import { db } from '../db';
import { lembagaProfiles } from '@katitb2024/database';
import { randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';
export const updatePinSchedule = schedule(
  '0,5,10,15,20,25,30,35,40,45,50,55 * * * *',
  () => {
    void db.transaction(async (tx) => {
      const lembaga = await tx
        .select({ code: lembagaProfiles.currentToken })
        .from(lembagaProfiles);
      console.log('ini lembaga', lembaga);
      const pinPerUnit = lembaga.reduce(
        (acc, unit) => {
          let newPin: string;

          do {
            newPin = randomBytes(3).toString('hex').toUpperCase();
          } while (Object.values(acc).includes(newPin));
          if (unit.code) {
            acc[unit.code] = newPin;
          }

          return acc;
        },
        {} as Record<string, string>,
      );
      await Promise.allSettled(
        Object.keys(pinPerUnit).map((pin) => {
          return tx
            .update(lembagaProfiles)
            .set({
              currentToken: pinPerUnit[pin],
              currentExpiry: new Date(Date.now() + 5 * 60 * 1000),
            })
            .where(eq(lembagaProfiles.currentToken, pin));
        }),
      );
    });
  },
  {
    scheduled: true,
    timezone: 'Asia/Jakarta',
  },
);
