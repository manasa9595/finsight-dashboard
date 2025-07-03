import express from "express";
import { db } from "../firebase";

const router = express.Router();

// Endpoint to fetch radar chart data
// Sample data structure for radar chart
// {
//   "labels": [
//     "Risk Score",
//     "Transaction Volume",
//     "KYC Completeness",
//     "Profile Completeness",
//     "Flagged Activity",
//     "Engagement"
//   ],
//   "values": [72, 31450, 86, 92, 8, 73]
// }

router.get("/chart", async (req, res) => {
  try {
    // Aggregate example values - customize based on actual data
    const profilesSnapshot = await db.collection("profiles").get();
    const totalProfiles = profilesSnapshot.size;

    let riskSum = 0;
    let transactionVolume = 0;
    let kycComplete = 0;
    let profileComplete = 0;
    let flagged = 0;
    let active = 0;

    for (const doc of profilesSnapshot.docs) {
      const p = doc.data();

      riskSum += p.riskScore || 0;
      transactionVolume += p.totalTransactionAmount || 0;

      if (p.kycStatus === "Completed") kycComplete++;
      if (p.profileCompleted) profileComplete++;
      if (p.flagged) flagged++;
      if (
        p.lastLogin &&
        Date.now() - new Date(p.lastLogin).getTime() < 1000 * 60 * 60 * 24 * 7
      ) {
        active++;
      }
    }

    const avgRisk = Math.round(riskSum / totalProfiles);
    const avgVolume = Math.round(transactionVolume / totalProfiles);
    const kycPercent = Math.round((kycComplete / totalProfiles) * 100);
    const profilePercent = Math.round((profileComplete / totalProfiles) * 100);
    const flaggedPercent = Math.round((flagged / totalProfiles) * 100);
    const activePercent = Math.round((active / totalProfiles) * 100);

    res.json({
      labels: [
        "Risk Score",
        "Transaction Volume",
        "KYC Completeness",
        "Profile Completeness",
        "Flagged Activity",
        "Engagement",
      ],
      values: [
        avgRisk,
        avgVolume,
        kycPercent,
        profilePercent,
        flaggedPercent,
        activePercent,
      ],
    });
  } catch (error) {
    console.error("Error generating radar data:", error);
    res.status(500).json({ error: "Failed to generate radar chart data" });
  }
});

export default router;
