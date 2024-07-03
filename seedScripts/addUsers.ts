import fs from "fs";
import csvParser from "csv-parser";
import { db } from "../src/server/db";
import {
  users,
  profiles,
  type UserRole,
  type campusEnum,
  type UserFaculty,
  type UserGender,
} from "@katitb2024/database"; // Adjust imports as per your database setup
import bcrypt from "bcrypt";
type CSVUser = {
  name: string;
  nim: string;
  faculty: UserFaculty;
  gender: UserGender;
  campus: (typeof campusEnum.enumValues)[number];
};

async function addUsersFromCSV(filePath: string, roletype: UserRole) {
  try {
    const stream = fs.createReadStream(filePath).pipe(csvParser());

    stream.on("data", (data: CSVUser) => {
      // Use a self-invoking function to handle the async operation
      void (async () => {
        try {
          const pass = await bcrypt.hash(roletype + "-" + data.nim, 10)
          const [addedUser] = await db
            .insert(users)
            .values({
              nim: data.nim,
              password: pass,
              role: roletype,
            })
            .returning();

          if (!addedUser) {
            throw new Error(`Failed to add user: ${data.nim}`);
          }

          await db.insert(profiles).values({
            campus: data.campus,
            faculty: data.faculty,
            gender: data.gender,
            name: data.name,
            userId: addedUser.id,
          });

          console.log(`User added: ${data.nim}`);
        } catch (error) {
          console.error(`Failed to add user: ${data.nim}`, error);
        }
      })();
    });

    stream.on("end", () => {
      console.log("CSV processing complete");
    });

    stream.on("error", (error) => {
      console.error("Error processing CSV file:", error);
    });
  } catch (error) {
    console.error("Error processing CSV file:", error);
  }
}

// Example usage:
const filePath = "./seedScripts/CSV/peserta.csv"; // Replace with your CSV file path

// Ensure the top-level promise is properly handled
addUsersFromCSV(filePath, "Peserta").catch((error) =>
  console.error("Unhandled error:", error),
);
