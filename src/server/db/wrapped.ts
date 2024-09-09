import bcrypt from 'bcrypt';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '@katitb2024/database';
import { eq, inArray, or, sql } from 'drizzle-orm';
import dotenv from 'dotenv';
import postgres from 'postgres';
import { ChatTopic } from '~/types/enum/chat';

const BATCH_SIZE = 100; // Increased batch size for processing

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
  const users = db
    .select()
    .from(schema.users)
    .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id));

  // Fetch total groups count
  const totalGroupsResult = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.groups);

  // Fetch all group ranks in a single query
  const groupRanksQuery = db
    .select({
      name: schema.groups.name,
      rank: sql`RANK() OVER (ORDER BY ${schema.groups.point} DESC)`,
    })
    .from(schema.groups);

  // Execute all queries concurrently
  const [usersResult, totalGroupsResultValue, groupRanks] = await Promise.all([
    users,
    totalGroupsResult,
    groupRanksQuery,
  ]);

  if (!totalGroupsResultValue[0]) {
    throw new Error('Error group value!');
  }

  const totalGroups = totalGroupsResultValue[0].count;

  const groupRankMap: Record<string, number> = Object.fromEntries(
    groupRanks.map((g) => [g.name, g.rank as number]),
  );

  for (let i = 0; i < usersResult.length; i += BATCH_SIZE) {
    try {
      const userBatch = usersResult.slice(i, i + BATCH_SIZE);
      const userIds = userBatch.map((u) => u.users.id);
      const userNims = userBatch.map((u) => u.users.nim);

      // Fetch user matches for the entire batch
      const userMatches = await db
        .select()
        .from(schema.userMatches)
        .where(
          or(
            inArray(schema.userMatches.firstUserId, userIds),
            inArray(schema.userMatches.secondUserId, userIds),
          ),
        );

      // Fetch submitted quests for the entire batch
      const submittedQuests = await db
        .select({
          userNim: schema.assignmentSubmissions.userNim,
          count: sql<number>`count(*)`,
        })
        .from(schema.assignmentSubmissions)
        .where(inArray(schema.assignmentSubmissions.userNim, userNims))
        .groupBy(schema.assignmentSubmissions.userNim);

      const submittedQuestsMap = Object.fromEntries(
        submittedQuests.map((sq) => [sq.userNim, sq.count]),
      );

      const wrappedProfiles = userBatch.map((user) => {
        const userMatchCount = userMatches.filter(
          (m) =>
            m.firstUserId === user.users.id || m.secondUserId === user.users.id,
        ).length;

        const topicFrequency: Record<string, number> = {};
        userMatches
          .filter(
            (m) =>
              m.firstUserId === user.users.id ||
              m.secondUserId === user.users.id,
          )
          .forEach((match) => {
            const topic = ChatTopic[parseInt(match.topic)];
            if (match.topic && topic) {
              topicFrequency[topic] = (topicFrequency[topic] ?? 0) + 1;
            }
          });

        const topTopics = Object.entries(topicFrequency)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([topic, count]) => ({ topic, count }));

        const favTopics = topTopics.map((topic) => topic.topic);
        const favTopicCount = topTopics[0]?.count;

        const groupRank = groupRankMap[user.profiles.group] ?? 0;
        const rankPercentage = 100 - (1 - groupRank / totalGroups) * 100;

        const submittedQuestCount = submittedQuestsMap[user.users.nim] ?? 0;

        return {
          userId: user.users.id,
          name: user.profiles.name,
          totalMatch: userMatchCount,
          submittedQuest: submittedQuestCount,
          character: user.profiles.lastMBTI,
          personality: user.profiles.lastMBTI,
          personalityDesc: user.profiles.lastMBTI
            ? personalityDescMap[user.profiles.lastMBTI]
            : null,
          favTopics,
          rank: groupRank,
          rankPercentage: rankPercentage.toString(),
          updatedAt: new Date(),
          favTopicCount,
        };
      });

      // Bulk insert wrapped profiles
      await db.insert(schema.wrappedProfiles).values(wrappedProfiles);
      console.log('Done seeding user batch', i);
    } catch (error) {
      console.log(`Fail seeding batch ${i}`);
    }
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
