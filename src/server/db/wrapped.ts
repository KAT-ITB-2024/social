import bcrypt from 'bcrypt';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@katitb2024/database';
import { eq, or, sql } from 'drizzle-orm';
import dotenv from 'dotenv';
import postgres from 'postgres';
import { ChatTopic } from '~/types/enum/chat';

export async function seedOSKMWrapped(db: PostgresJsDatabase<typeof schema>) {
  const personalityDescMap = {
    Mova: 'Kamu dikenal sebagai sosok yang memiliki semangat yang besar untuk mempelajari hal baru dan mudah beradaptasi dengan lingkungan baru. Kamu mampu mengaplikasikan pengetahuanmu itu untuk menyelesaikan masalah di sekitarmu dan dikenal sebagai sosok yang berbeda dibandingkan dengan orang-orang di sekitarmu. Meskipun berbeda, kamu memiliki keberanian yang besar dalam menghadapi permasalahan dan tidak takut dengan kegagalan.',
    Kovva:
      'Kamu dikenal sebagai sosok yang mengandalkan logika dan rasionalitas dalam mempelajari hal baru serta memiliki aturan dan sistem dalam setiap hal yang kamu lakukan. Kamu suka dengan pengembangan teknologi yang ada dan selalu berusaha untuk menguasai pengetahuan terbaru. Meskipun dikenal sebagai sosok yang kaku dalam bekerja, kamu dapat menyelesaikan semua pekerjaanmu karena memiliki sistem bekerja yang teratur.',
    Ozirron:
      'Ketidakpastian menjadi ciri khasmu, karena pergerakanmu yang tidak teratur dan sulit diprediksi membuatmu menjadi ancaman yang tidak bisa diremehkan. Keberadaanmu adalah simbol dari kekuatan destruktif yang sulit dilawan, dan kamu tidak pernah takut untuk menunjukkan dominasimu. Meskipun menyeramkan dan cenderung ditakuti oleh orang-orang, kamu memiliki pesona yang memikat dalam kehadiranmu yang penuh misteri. Ada daya tarik yang tak bisa dijelaskan yang membuat orang-orang tertarik untuk mendekat, meskipun mereka sadar akan bahaya yang kamu bawa.',
    Sylas:
      'Kamu dikenal sebagai sosok yang mencintai kedamaian dan ketenangan dalam segala situasi. Kamu selalu berusaha untuk mempertahankan kedua hal tersebut di mana pun kamu berada dan cenderung menghindari keributan. Menjamin pertumbuhan dan kedamaian diri merupakan kesukaanmu, sehingga orang-orang cenderung datang kepadamu untuk mencari teman bercerita karena kamu memiliki kondisi spiritual yang sangat baik.',
    Odra: 'Kamu dikenal sebagai sosok yang bijak karena memiliki wawasan yang luas dan dapat melihat situasi dari berbagai sudut pandang. Pengetahuan yang mendalam dan pengalaman yang banyak ini kamu peroleh dari perjalanan hidupmu yang sudah cukup panjang. Kamu pun tidak enggan dalam membagikan pengalaman dan pengetahuanmu tersebut untuk membantu orang di sekitarmu. ',
  };
  const users = await db
    .select()
    .from(schema.users)
    .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
    .limit(2);
  const batch = 1;
  const totalGroups = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.groups)
    .then((result) => result[0]?.count ?? 0);
  console.log('INI USERS', users);
  console.log('INi total groups', totalGroups);
  for (const user of users) {
    const userMatches = await db
      .select()
      .from(schema.userMatches)
      .where(
        or(
          eq(schema.userMatches.firstUserId, user.users.id),
          eq(schema.userMatches.secondUserId, user.users.id),
        ),
      );
    const topicFrequency: Record<string, number> = {};

    for (const match of userMatches) {
      const topic = ChatTopic[parseInt(match.topic)];
      if (match.topic && topic) {
        topicFrequency[topic] = (topicFrequency[topic] ?? 0) + 1;
      }
    }

    const submittedQuestRaw = await db
      .select()
      .from(schema.assignmentSubmissions)
      .where(eq(schema.assignmentSubmissions.userNim, user.users.nim));

    const group = await db
      .select({
        name: sql`gr.name`,
        point: sql`gr.point`,
        rank: sql`gr.rank`,
      })
      .from(
        sql`(
      SELECT
        g."groupName" as name,
        g."point",
        RANK() OVER (ORDER BY g."point" DESC) AS rank
        FROM ${schema.groups} g
    ) AS gr`,
      )
      .where(eq(sql`gr.name`, user.profiles.group))
      .then((result) => result[0] ?? null);

    const groupRank = group?.rank as number;
    const totalMatch = userMatches.length;
    const topTopics = Object.entries(topicFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topic, count]) => ({ topic, count }));

    console.log('INI TOPIC FREQUENCY', topicFrequency);

    const favTopics = topTopics.map((topic) => topic.topic);
    const favTopicCount = topTopics[0]?.count;

    const rankPercentage = Math.round((groupRank / totalGroups) * 100);

    const personality = user.profiles.lastMBTI;

    await db.insert(schema.wrappedProfiles).values({
      userId: user.users.id,
      name: user.profiles.name,
      totalMatch,
      submittedQuest: submittedQuestRaw.length,
      character: personality,
      personality,
      personalityDesc: (personality && personalityDescMap[personality]) ?? null,
      favTopics,
      rank: groupRank,
      rankPercentage,
      updatedAt: new Date(),
      favTopicCount,
    });
    console.log('DOne seeding user', user);
  }
}
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

export async function seed(dbUrl: string) {
  const migrationClient = postgres(dbUrl, { max: 1 });
  const db = drizzle(migrationClient, { schema });
  await seedOSKMWrapped(db);
}

const seeding = async () => {
  await seed(dbUrl ?? '');
};

seeding().catch((err) => {
  console.error(err);
});
