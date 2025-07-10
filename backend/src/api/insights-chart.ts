import express from "express";
import serverless from "serverless-http";
import insightsChart from "../routes/insightsChart";

const app = express();
app.use("/api/insights", insightsChart);

export default serverless(app);
