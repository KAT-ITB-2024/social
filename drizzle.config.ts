import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./node_modules/database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["t3-template-app_*"],
} satisfies Config;
