import bcrypt from 'bcrypt';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@katitb2024/database';
import { asc, eq } from 'drizzle-orm';
import dotenv from 'dotenv';
import { ClassData } from './classData';

export async function seedUser(db: PostgresJsDatabase<typeof schema>) {
  const password = await bcrypt.hash('password', 10);
  for (let i = 0; i < 10; i++) {
    try {
      await db.insert(schema.users).values({
        nim: `1352100${i}`,
        password,
        role: 'Peserta',
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error(`Error seeding Peserta`);
      break;
    }
  }

  for (let i = 0; i < 5; i++) {
    const role = i % 2 === 0 ? 'Mamet' : 'Mentor';
    try {
      await db.insert(schema.users).values({
        nim: `1352200${i}`,
        password,
        role,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error(`Error seeding mamet / mentor`);
      break;
    }
  }
}

export async function seedGroup(db: PostgresJsDatabase<typeof schema>) {
  for (let i = 0; i < 6; i++) {
    try {
      await db.insert(schema.groups).values({
        name: `Keluarga-${i}`,
        point: 0,
        bata: `${i}`,
      });
    } catch (error) {}
  }
}

export async function seedProfile(db: PostgresJsDatabase<typeof schema>) {
  const userIds = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.role, 'Peserta'));
  const groups = await db.select().from(schema.groups);
  if (!userIds) {
    return;
  }

  for (let i = 0; i < userIds.length - 1; i++) {
    const user = userIds[i];
    const group = groups[i % 6];
    if (!user || !group) {
      return;
    }
    try {
      await db.insert(schema.profiles).values({
        name: `User ${i + 1}`,
        userId: user.id,
        faculty: 'STEI',
        gender: i % 2 === 0 ? 'Male' : 'Female',
        profileImage: null,
        point: 0,
        group: group.name,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error(`Error seeding profile`);
      return;
    }
  }
}

export async function seedAssignment(db: PostgresJsDatabase<typeof schema>) {
  let dayCounter = 25;
  for (let i = 0; i < 4; i++) {
    await db.insert(schema.assignments).values({
      title: `Assignment ${i}`,
      description: `Description buat assignment ke ${i}`,
      startTime: new Date(`2024-08-${dayCounter}T00:00:00Z`), // Tanggal 25
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      assignmentType: 'Main',
      point: 10,
      filename: `Assignment ${i}`,
      downloadUrl: 'https://google.com/DownloadUrl',
      updatedAt: new Date(),
    });
    dayCounter += 1;
  }

  dayCounter = 25;
  for (let i = 0; i < 4; i++) {
    await db.insert(schema.assignments).values({
      title: `Side Quest ${i}`,
      description: `Description buat Side Quest ke ${i}`,
      startTime: new Date(`2024-08-${dayCounter}T00:00:00Z`),
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      assignmentType: 'Side',
      point: 50,
      updatedAt: new Date(),
      filename: '',
      downloadUrl: '',
    });
    dayCounter += 1;
  }
}

export async function seedCharacter(db: PostgresJsDatabase<typeof schema>) {
  await db.insert(schema.characters).values({
    name: 'Kova',
    characterImage: '/images/characters/Kovva.png',
  });

  await db.insert(schema.characters).values({
    name: 'Ozirron',
    characterImage: '/images/characters/Ozirron.png',
  });

  await db.insert(schema.characters).values({
    name: 'Sylas',
    characterImage: '/images/characters/Sylas.png',
  });

  await db.insert(schema.characters).values({
    name: 'Odra',
    characterImage: '/images/characters/Odra.png',
  });
}

export async function seedEvent(db: PostgresJsDatabase<typeof schema>) {
  const characters = await db.query.characters.findMany();

  if (!characters[0]) {
    return;
  }

  await db.insert(schema.events).values({
    day: 'Day 1',
    eventDate: new Date('2024-08-30T00:00:00Z'),
    openingOpenPresenceTime: '09:00:00',
    openingClosePresenceTime: '10:00:00',
    closingOpenPresenceTime: '17:00:00',
    closingClosePresenceTime: '18:00:00',
    updatedAt: new Date(),
    lore: 'Di tengah kekacauan yang terjadi di Samudra Korionas, Mova mendarat di laut pertama, Laut Krios. Sebagai pusat dari segala kegiatan produksi barang dan teknologi yang digunakan dalam peradaban samudra, laut ini dipimpin oleh Kovva, sang guru besar yang ahli perhitungan. Bersama Kovva, Mova belajar membuat senjata yang dapat digunakan untuk melawan sang makhluk jahat, Odra. Di akhir pembelajarannya, Kovva memberi Mova hadiah sebuah membran untuk melengkapi penampilannya. Siap untuk berpetualang ke laut berikutnya, petualangan apa yang telah menanti Mova? Sebentar, lihat apa yang keluar dari membran yang melekat di tubuh Mova!',
    characterName: 'Kova',
    guideBook: '',
    youtubeVideo: '',
  });

  await db.insert(schema.events).values({
    day: 'Day 2',
    eventDate: new Date('2024-08-30T00:00:00Z'),
    openingOpenPresenceTime: '09:00:00',
    openingClosePresenceTime: '10:00:00',
    closingOpenPresenceTime: '17:00:00',
    closingClosePresenceTime: '18:00:00',
    updatedAt: new Date(),
    lore: 'Mova sampai di Laut Odris yang menjadi pusat segala pengetahuan dan sejarah peradaban Korionas. Lewat pustaka magis yang dijaga oleh Ozirron, sang guru besar, Mova memperdalam ilmunya dan belajar menjadi ahli strategi dalam melawan serangan Odra. Kali ini, Ozirron pun memberikan Mova sebuah membran, menambah koleksi membran yang telah melekat di tubuhnya. Mova siap untuk berpindah, apa yang akan Mova temukan selanjutnya?',
    characterName: 'Ozirron',
    guideBook: '',
    youtubeVideo: '',
  });

  await db.insert(schema.events).values({
    day: 'Day 3',
    eventDate: new Date('2024-08-31T00:00:00Z'),
    openingOpenPresenceTime: '09:00:00',
    openingClosePresenceTime: '10:00:00',
    closingOpenPresenceTime: '17:00:00',
    closingClosePresenceTime: '18:00:00',
    updatedAt: new Date(),
    lore: 'Mendarat tepat di laut ketiga, Laut Sereia, Mova bertemu dengan Sylas, sang guru spiritual penuh kehangatan, yang mengajarkannya cara merapalkan mantra magis yang dapat membentuk tameng perlindungan. Sama seperti dua guru sebelumnya, Sylas memberinya membran ketiga yang kini membuat penampilannya sama dengan penduduk Korionas. Menyelesaikan petualangannya di ketiga laut legendaris, Mova siap meninggalkan Samudra Korionas. Namun, tiba-tiba tubuhnya ditarik oleh sebuah kekuatan misterius! Apa yang sebenarnya terjadi?',
    characterName: 'Sylas',
    guideBook: '',
    youtubeVideo: '',
  });

  await db.insert(schema.events).values({
    day: 'Day 4',
    eventDate: new Date('2024-09-01T00:00:00Z'),
    openingOpenPresenceTime: '09:00:00',
    openingClosePresenceTime: '10:00:00',
    closingOpenPresenceTime: '17:00:00',
    closingClosePresenceTime: '18:00:00',
    updatedAt: new Date(),
    lore: 'Gawat! Sang makhluk jahat, Odra, menculik Mova untuk bertarung dengannya. Tak hanya sendiri, ia dibantu oleh Kovva, Ozirron, dan Sylas secara bergantian. Sayangnya, mereka tidak berhasil melawan Odra yang sangat besar dan ganas. Apa yang harus mereka lakukan? Akankah mereka berhasil melawan Odra dan mengembalikan kedamaian di Samudra Korionas?',
    characterName: 'Odra',
    guideBook: '',
    youtubeVideo: '',
  });
}

export async function seedAssignmentSubmission(
  db: PostgresJsDatabase<typeof schema>,
) {
  const assignments = await db.query.assignments.findMany();
  const users = await db.query.users.findMany();

  if (assignments.length < 4) {
    throw new Error(
      'Not enough assignments available to seed assignment submissions.',
    );
  }

  for (let i = 0; i < 10; i++) {
    await db.insert(schema.assignmentSubmissions).values({
      assignmentId: assignments[i % 4]?.id ?? '',
      userNim: users[i]?.nim ?? '',
      filename: `Assignment ${i}`,
      downloadUrl: 'https://google.com/DownloadUrl',
      point: i % 3 == 0 ? null : (assignments[i % 4]?.point ?? 0),
      updatedAt: new Date(),
    });
  }
}

export async function seedPostTest(db: PostgresJsDatabase<typeof schema>) {
  const events = await db.query.events.findMany();

  if (events.length < 2) {
    throw new Error('Not enough events available to seed post tests.');
  }

  for (let i = 0; i < 2; i++) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7); // Adds 7 days to the current date

    await db.insert(schema.postTests).values({
      eventId: events[i]?.id ?? '',
      googleFormLink: 'https://google.com',
      startTime: new Date(),
      deadline,
    });
  }
}

export async function seedNotifications(db: PostgresJsDatabase<typeof schema>) {
  for (let i = 0; i < 4; i++) {
    await db.insert(schema.notifications).values({
      content: `Tugas untuk day ke-${i} baru saja muncul!`,
    });
  }
}

export async function seedClasses(db: PostgresJsDatabase<typeof schema>) {
  for (const classDetails of ClassData) {
    try {
      await db.insert(schema.classes).values({
        title: classDetails.title,
        topic: `${classDetails.theme}: ${classDetails.topik}`,
        description: classDetails.desc,
        speaker: classDetails.speaker,
        location: classDetails.location,
        date: new Date(`${classDetails.date}T${classDetails.time}+07:00`),
        totalSeats: classDetails.quota,
        reservedSeats: classDetails.reserved,
        type: classDetails.type,
      });
    } catch (error) {
      console.error(
        `Error seeding class with title ${classDetails.title}:`,
        error,
      );
      continue;
    }
  }
  console.log('Done seeding classes!');
}

export async function seedOskmWrapped(db: PostgresJsDatabase<typeof schema>) {
  const user = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .limit(2);
  if (!user[0] || !user[1]) {
    return;
  }
  // Data dummy buat yang udah test
  await db.insert(schema.wrappedProfiles).values({
    userId: user[0].id,
    name: 'User 0',
    submittedQuest: 10,
    totalMatch: 20,
    character: 'Odra',
    personality: 'IIII',
    personalityDesc: 'Ini iiiiii',
    favTopics: ['General', 'Game', 'Olahraga'],
    rank: 129,
    rankPercentage: 12,
    updatedAt: new Date(),
    favTopicCount: 3,
  });

  await db.insert(schema.wrappedProfiles).values({
    userId: user[1].id,
    name: 'User 1',
    updatedAt: new Date(),
    favTopics: ['General'],
    submittedQuest: 8,
    totalMatch: 0,
    rank: 80,
    rankPercentage: 90,
    favTopicCount: 1,
  });
}

export async function seedLembaga(db: PostgresJsDatabase<typeof schema>) {
  const password = await bcrypt.hash('password', 10);

  const ukmUser = await db
    .insert(schema.users)
    .values({
      nim: '12345678',
      role: 'ITB-X',
      password,
      activityPoints: 0,
      updatedAt: new Date(),
    })
    .returning();
  if (!ukmUser[0]) {
    return;
  }
  await db.insert(schema.lembagaProfiles).values({
    lembaga: 'UKM',
    detailedCategory: 'Agama',
    name: 'PMK',
    logo: '',
    description: 'Contoh UKM Agama',
    instagram: '',
    visitorCount: 5,
    userId: ukmUser[0].id,
    currentToken: '123456',
    currentExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 hari dari sekarang,
    updatedAt: new Date(),
  });

  const hmpsUser = await db
    .insert(schema.users)
    .values({
      nim: 'HMIF',
      role: 'ITB-X',
      password,
      updatedAt: new Date(),
    })
    .returning();

  if (!hmpsUser[0]) {
    return;
  }

  await db.insert(schema.lembagaProfiles).values({
    lembaga: 'HMPS',
    detailedCategory: 'STEI-K',
    name: 'HMIF',
    logo: '',
    description: 'Himpunan Mahasiswa Informatika',
    instagram: '',
    userId: hmpsUser[0].id,
    currentToken: '123456',
    currentExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 hari dari sekarang,
    updatedAt: new Date(),
    visitorCount: 5,
  });
}
export async function seedMerchandise(db: PostgresJsDatabase<typeof schema>) {
  for (let i = 0; i < 10; i++) {
    await db.insert(schema.merchandises).values({
      name: `Merchandise-${i}`,
      price: 400 + i * 100,
      stock: 10,
      image: '',
      updatedAt: new Date(),
    });
  }
}

export async function seedVisitor(db: PostgresJsDatabase<typeof schema>) {
  const lembaga = await db.select().from(schema.lembagaProfiles).limit(2);
  const users = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.role, 'Peserta'))
    .limit(10);

  if (!lembaga[0] || !lembaga[1]) {
    return;
  }

  for (let i = 0; i < 10; i++) {
    await db.insert(schema.visitors).values({
      boothId: lembaga[i % 2]?.userId ?? '',
      userId: users[i % 7]?.id ?? '',
      updatedAt: new Date(),
    });
  }

  // @eslint-disable-next-line
}

const coins = [800, 1200, 1500];

export async function seedHistoryTransaction(
  db: PostgresJsDatabase<typeof schema>,
) {
  const users = await db
    .select()
    .from(schema.users)
    .orderBy(asc(schema.users.nim))
    .limit(3);

  for (let i = 0; i < 3; i++) {
    const currCoin = coins[i];

    let quantity;
    switch (currCoin) {
      case 800:
        quantity = 2;
        break;
      case 1200:
        quantity = 1;
        break;
      case 1500:
        quantity = 3;
        break;
      default:
        quantity = 0;
    }

    await db.insert(schema.merchandiseExchanges).values({
      status: 'Taken',
      userId: users[i]?.id ?? '',
      totalCoins: currCoin,
      totalItem: quantity,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    await db.insert(schema.merchandiseExchanges).values({
      status: 'Not Taken',
      userId: users[i]?.id ?? '',
      totalCoins: currCoin,
      totalItem: quantity,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  }
}

export async function seedHistoryDetail(db: PostgresJsDatabase<typeof schema>) {
  const exchanges = await db.query.merchandiseExchanges.findMany();
  const merchandise = await db
    .select()
    .from(schema.merchandises)
    .orderBy(asc(schema.merchandises.price))
    .limit(3);

  for (const exchange of exchanges) {
    switch (exchange.totalCoins) {
      case 800:
        await db.insert(schema.merchandiseExchangeDetails).values({
          merchandiseId: merchandise[0]?.id ?? '',
          quantity: 2,
          merchandiseExchangeId: exchange.id,
        });
        break;
      case 1200:
        await db.insert(schema.merchandiseExchangeDetails).values({
          merchandiseExchangeId: exchange.id,
          merchandiseId: merchandise[2]?.id ?? '',
          quantity: 2,
        });
        break;
      case 1500:
        await db.insert(schema.merchandiseExchangeDetails).values([
          {
            merchandiseExchangeId: exchange.id,
            merchandiseId: merchandise[0]?.id ?? '',
            quantity: 1,
          },
          {
            merchandiseExchangeId: exchange.id,
            merchandiseId: merchandise[1]?.id ?? '',
            quantity: 1,
          },
          {
            merchandiseExchangeId: exchange.id,
            merchandiseId: merchandise[2]?.id ?? '',
            quantity: 1,
          },
        ]);
        break;
    }
  }
}

export async function seed(dbUrl: string) {
  const migrationClient = postgres(dbUrl, { max: 1 });

  const db = drizzle(migrationClient, { schema });
  await seedUser(db);
  console.log('Done seeding user');
  await seedGroup(db);
  console.log('Done seeding group!');
  await seedProfile(db);
  console.log('Done seeding profile');
  await seedCharacter(db);
  console.log('Done seeding character');
  await seedEvent(db);
  console.log('Done seeding event');
  await seedAssignment(db);
  console.log('Done seeding assignment');
  await seedAssignmentSubmission(db);
  console.log('Done seeding assignment submission');
  await seedPostTest(db);
  console.log('Done seeding post test');
  await seedNotifications(db);
  console.log('Done seeding notifications!');
  await seedClasses(db);
  console.log('Done seeding classes!');
  await seedOskmWrapped(db);
  console.log('Done seeding oskm wrapped!');
  await seedMerchandise(db);
  console.log('Done seeding merchandise!');
  await seedLembaga(db);
  console.log('Done seeding lembaga!');
  await seedHistoryTransaction(db);
  console.log('Done seeding history transaction!');
  await seedHistoryDetail(db);
  console.log('Done seeding history detail!');
  await seedVisitor(db);
  console.log('Done seeding visitor!');
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
