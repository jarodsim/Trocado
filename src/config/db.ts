import { DataSource } from "typeorm";

import { User } from "../entity/User";

import { config } from "dotenv";
config();

export const myDataSource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USER,
  entities: [User],
  synchronize: true,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
