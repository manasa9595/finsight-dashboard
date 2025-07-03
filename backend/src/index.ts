import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pendingActions from "./routes/pendingActions";
import profiles from "./routes/profiles";
import insightsChart from "./routes/insightsChart";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pending-actions", pendingActions);
app.use("/api/profiles", profiles);
app.use("/api/insights", insightsChart);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
