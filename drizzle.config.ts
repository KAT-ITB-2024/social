import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./node_modules/database/dist/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:posgtres@localhost:5432/coba",
  },
  out: './node_modules/database/drizzle',
  tablesFilter: ["t3-template-app_*"],
} satisfies Config;
