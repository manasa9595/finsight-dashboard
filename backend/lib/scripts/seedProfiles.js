"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccountKey_json_1 = __importDefault(require("../../serviceAccountKey.json")); // adjust path as needed
const uuid_1 = require("uuid");
// Initialize Firebase Admin
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccountKey_json_1.default),
    });
}
const db = firebase_admin_1.default.firestore();
// Static arrays for diversity
const riskLevels = [45, 60, 70, 80, 95];
const holdingTypes = ["Cash", "Stocks", "Crypto", "Bonds", "Real Estate"];
const transactionTypes = ["Deposit", "KYC", "Transfer", "Review"];
const transactionStatuses = ["Completed", "Pending", "Rejected"];
function createRandomProfile(i) {
    const id = (0, uuid_1.v4)();
    const name = `User ${i + 1}`;
    const email = `user${i + 1}@bank.com`;
    const riskScore = riskLevels[i % riskLevels.length];
    const joinedAt = new Date(Date.now() - i * 86400000 * 15).toISOString(); // every 15 days back
    const lastActionNote = `Action note for ${name}`;
    const holdings = [
        {
            type: holdingTypes[i % holdingTypes.length],
            value: 5000 + i * 1000,
        },
        {
            type: holdingTypes[(i + 1) % holdingTypes.length],
            value: 3000 + i * 500,
        },
    ];
    const transactions = [
        {
            id: `txn-${i}-1`,
            type: transactionTypes[i % transactionTypes.length],
            status: transactionStatuses[i % transactionStatuses.length],
            date: new Date(Date.now() - i * 86400000 * 10).toISOString(),
        },
        {
            id: `txn-${i}-2`,
            type: transactionTypes[(i + 1) % transactionTypes.length],
            status: transactionStatuses[(i + 1) % transactionStatuses.length],
            date: new Date(Date.now() - i * 86400000 * 5).toISOString(),
        },
    ];
    return {
        id,
        name,
        email,
        riskScore,
        joinedAt,
        holdings,
        transactions,
        lastActionNote,
    };
}
async function seedProfiles() {
    const batch = db.batch();
    for (let i = 0; i < 20; i++) {
        const profile = createRandomProfile(i);
        const docRef = db.collection("profiles").doc(profile.id); // preserve id in doc ID
        batch.set(docRef, profile);
    }
    await batch.commit();
    console.log("✅ Successfully seeded 20 profiles to Firestore");
}
seedProfiles().catch(console.error);
