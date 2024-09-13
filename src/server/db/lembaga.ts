import bcrypt from 'bcrypt';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@katitb2024/database';
import dotenv from 'dotenv';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { randomBytes } from 'crypto';

// Tentukan path file csv
const csvFilePath = path.resolve(__dirname, './lembaga.csv');
type UserCSV = {
  nim: string;
  password: string;
  rumpun: string;
  lembagaName: string;
  link?: string;
  group?: string;
  logo?: string;
};

export async function seedUserFromCsv(db: PostgresJsDatabase<typeof schema>) {
  const users: UserCSV[] = [];
  // Bungkus dalam Promise agar dapat menunggu proses pembacaan CSV selesai
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        users.push(row as UserCSV); // Simpan setiap baris ke dalam array users
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve();
      })
      .on('error', (error) => {
        reject(error); // Tangani error jika ada
      });
  });
  console.log('ini users', users[1]);
  for (const user of users) {
    const { nim, password, lembagaName, rumpun, group, link, logo } = user;

    let index = 0;
    switch (rumpun) {
      case 'BSO':
        index = 0;
        break;
      case 'UKM':
        index = 1;
        break;
      case 'HMPS':
        index = 2;
        break;
      case 'Pusat':
        index = 3;
        break;
      case 'Eksternal':
        index = 4;
        break;
      default:
        break;
    }

    const enumValues = schema.lembagaEnum.enumValues[index];
    if (!enumValues) {
      console.log('Enum valuees not found');
      return;
    }

    const code = randomBytes(3).toString('hex').toUpperCase();

    try {
      const newUser = await db
        .insert(schema.users)
        .values({
          nim,
          password,
          role: 'ITB-X',
          updatedAt: new Date(),
        })
        .returning();
      if (!newUser[0]) {
        throw new Error(`Error inserting user`);
      }
      await db.insert(schema.lembagaProfiles).values({
        lembaga: enumValues,
        name: lembagaName,
        updatedAt: new Date(),
        userId: newUser[0].id,
        detailedCategory: group,
        detailLink: `https://oskmitb.com/itb-x/detail/${link}`,
        logo,
        currentToken: code,
        currentExpiry: new Date(Date.now() + 5 * 60 * 1000),
      });
    } catch (error) {
      console.log('Error', error);
    }
  }
}

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

const seeding = async () => {
  const migrationClient = postgres(dbUrl ?? '', { max: 1 });

  const db = drizzle(migrationClient, { schema });
  await seedUserFromCsv(db ?? '');
};

seeding().catch((err) => {
  console.error(err);
});
