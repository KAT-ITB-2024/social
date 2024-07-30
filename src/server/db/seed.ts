// import bcrypt from 'bcrypt';
// import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from '@katitb2024/database';
// import { eq } from 'drizzle-orm';
// import dotenv from 'dotenv';

// export async function seedUser(db: PostgresJsDatabase<typeof schema>) {
//   const password = await bcrypt.hash('password', 10);
//   for (let i = 0; i < 10; i++) {
//     try {
//       await db.insert(schema.users).values({
//         nim: `1352100${i}`,
//         password,
//         role: 'Peserta',
//         updatedAt: new Date(),
//       });
//     } catch (error) {
//       console.error(`Error seeding Peserta`);
//       break;
//     }
//   }

//   for (let i = 0; i < 5; i++) {
//     const role = i % 2 === 0 ? 'Mamet' : 'Mentor';
//     try {
//       await db.insert(schema.users).values({
//         nim: `1352200${i}`,
//         password,
//         role,
//         updatedAt: new Date(),
//       });
//     } catch (error) {
//       console.error(`Error seeding mamet / mentor`);
//       break;
//     }
//   }
// }

// export async function seedProfile(db: PostgresJsDatabase<typeof schema>) {
//   const userIds = await db
//     .select()
//     .from(schema.users)
//     .where(eq(schema.users.role, 'Peserta'));
//   if (!userIds) {
//     return;
//   }

//   for (let i = 0; i < userIds.length - 1; i++) {
//     const user = userIds[i];
//     if (!user) {
//       return;
//     }
//     try {
//       await db.insert(schema.profiles).values({
//         name: `User ${user.id}`,
//         userId: user.id,
//         faculty: 'STEI',
//         gender: i % 2 === 0 ? 'Male' : 'Female',
//         campus: i % 3 === 0 ? 'Ganesha' : 'Jatinangor',
//         profileImage: '',
//         point: 0,
//         groupNumber: 1,
//         updatedAt: new Date(),
//       });
//     } catch (error) {
//       console.error(`Error seeding profile`);
//       return;
//     }
//   }
// }

// export async function seedAssignment(db: PostgresJsDatabase<typeof schema>) {
//   let dayCounter = 25;
//   for (let i = 0; i < 4; i++) {
//     await db.insert(schema.assignments).values({
//       title: `Assignment ${i}`,
//       description: `Description buat assignment ke ${i}`,
//       startTime: new Date(`2023-07-${dayCounter}T00:00:00Z`), // Tanggal 25
//       deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       assignmentType: 'Daily',
//       point: 10,
//       updatedAt: new Date(),
//     });
//     dayCounter += 1;
//   }
// }

// export async function seedCharacter(db: PostgresJsDatabase<typeof schema>) {
//   for (let i = 0; i < 4; i++) {
//     try {
//       await db.insert(schema.characters).values({
//         name: `Character ${i}`,
//         characterImage: '',
//       });
//     } catch (error) {
//       console.error(`Error seeding character`);
//     }
//   }
// }

// export async function seedEvent(db: PostgresJsDatabase<typeof schema>) {
//   const characters = await db.query.characters.findMany();

//   if (!characters[0]) {
//     return;
//   }

//   await db.insert(schema.events).values({
//     day: 'Day 1',
//     eventDate: new Date('2023-07-25T00:00:00Z'),
//     openingOpenPresenceTime: '09:00:00',
//     openingClosePresenceTime: '10:00:00',
//     closingOpenPresenceTime: '17:00:00',
//     closingClosePresenceTime: '18:00:00',
//     updatedAt: new Date(),
//     lore: 'https://google.com',
//     characterName: characters[0]?.name,
//     guideBook: '',
//   });

//   await db.insert(schema.events).values({
//     day: 'Day 2',
//     eventDate: new Date('2023-07-28T00:00:00Z'),
//     openingOpenPresenceTime: '09:00:00',
//     openingClosePresenceTime: '10:00:00',
//     closingOpenPresenceTime: '17:00:00',
//     closingClosePresenceTime: '18:00:00',
//     updatedAt: new Date(),
//     lore: 'https://google.com',
//     characterName: characters[0]?.name,
//     guideBook: '',
//   });
// }

// export async function seed(dbUrl: string) {
//   const migrationClient = postgres(dbUrl, { max: 1 });

//   const db = drizzle(migrationClient, { schema });
//   await seedUser(db);
//   console.log('DOne seeding user');
//   await seedProfile(db);
//   console.log('Done seeding profile');
//   await seedCharacter(db);
//   console.log('Done seeding character');
//   await seedEvent(db);
//   console.log('Done seeding event');
//   await seedAssignment(db);
//   console.log('Done seeding assignment');
//   await migrationClient.end();
// }
// dotenv.config();

// const dbUrl = process.env.DATABASE_URL;
// if (!dbUrl) {
//   console.error('No databse url provided!');
// } else {
//   await seed(dbUrl)
//     .catch((err) => {
//       console.log(err);
//     })
//     .then(() => console.log('Done seeding data!'));
// }
