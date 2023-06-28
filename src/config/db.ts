import { DataSource } from "typeorm";

import { User } from "../entity/User";
import { Balance } from "../entity/Balance";
import { Category } from "../entity/Category";
import { Movement } from "../entity/Movement";
import { Goal } from "../entity/Goal";

import { config } from "dotenv";
import { FutureMovement } from "../entity/FutureMovement";
config();

export const myDataSource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USER,
  entities: [User, Balance, Category, Movement, Goal, FutureMovement],
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
