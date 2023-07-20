import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import admin from "firebase-admin";
import serviceAccount from "./config/serviceAccountKey.json";
import { initializeApp } from "firebase/app";

import { routers } from "./routers/routers";
import { seed } from "./config/seed";

export const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_AUTH_DATABASE_URL,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
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
