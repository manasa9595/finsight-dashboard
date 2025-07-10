import express from "express";
import pendingActions from "./routes/pendingActions";
import insightsChart from "./routes/insightsChart";
import profiles from "./routes/profiles";

const app = express();

app.use(express.json());
app.use("/", pendingActions);
app.use("/", profiles);
app.use("/", insightsChart);

export default app;
