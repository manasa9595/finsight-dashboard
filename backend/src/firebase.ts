import {
  initializeApp,
  cert,
  getApps,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let serviceAccount: ServiceAccount;

if (process.env.FIREBASE_PRIVATE_KEY) {
  serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  };
} else {
  serviceAccount = require("./firebase/serviceAccountKey.json");
}

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

export const db = getFirestore();
