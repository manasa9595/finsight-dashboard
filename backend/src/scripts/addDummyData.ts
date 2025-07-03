import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json"; // adjust path as needed

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

async function addDummyData() {
  const collectionRef = db.collection("pendingActions");

  const statuses = ["Pending", "Under Review", "Approved", "Rejected"];
  const types = [
    "Transaction Approval",
    "Loan Application",
    "KYC Verification",
    "Account Update",
    "Compliance Review",
  ];
  const customers = [
    "Alice Tan",
    "John Lim",
    "Rachel Goh",
    "Michael Wong",
    "Siti Nurhaliza",
    "David Lee",
    "Linda Tan",
  ];

  const batch = db.batch();

  for (let i = 1; i <= 50; i++) {
    const id = `TXN-${1000 + i}`;
    const docRef = collectionRef.doc();

    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const randomAmount = (Math.floor(Math.random() * 20000) + 1000); // 1,000 to 21,000
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30) // up to 30 days ago
    );

    batch.set(docRef, {
      id,
      type: randomType,
      customer: randomCustomer,
      amount: randomAmount,
      date: admin.firestore.Timestamp.fromDate(randomDate),
      status: randomStatus,
    });
  }

  await batch.commit();
  console.log("Added 50 dummy pendingActions to Firestore.");
}

addDummyData().catch(console.error);
