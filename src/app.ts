import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import admin from "firebase-admin";
import serviceAccount from "./config/serviceAccountKey.json";

import { routers } from "./routers/routers";
import { seed } from "./config/seed";

export const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

app.use(cors());
app.use(bodyParser.json());

app.use(logger("dev"));

app.use(routers);

if (process.env.NODE_ENV === "development") {
  setTimeout(() => {
    seed();
  }, 2000);
}
