import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@katitb2024/database';
import postgres from 'postgres';
import dotenv from 'dotenv';

export async function seedVisitors(db: PostgresJsDatabase<typeof schema>) {
  const users = await db.select().from(schema.users);
  let i = 0;
  for (const user of users) {
    await db.insert(schema.visitors).values({
      userId: user.id,
      boothId: 'b71nbrmkxuxbe0dkcyvm1xft',
      updatedAt: new Date(),
    });
    i += 1;
    if (i === 1500) {
      break;
    }
  }
}

export async function seed(dbUrl: string) {
  const migrationClient = postgres(dbUrl, { max: 1 });
  const db = drizzle(migrationClient, { schema });
  await seedVisitors(db);
  console.log('Done seeding visitors');
  await migrationClient.end();
}

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

const seeding = async () => {
  await seed(dbUrl ?? '');
};

seeding().catch((err) => {
  console.error(err);
});
