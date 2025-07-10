import express from "express";
import profilesRouter from "./routes/profiles";
import insightsRouter from "./routes/insightsChart";
import pendingActionsRouter from "./routes/pendingActions";

const app = express();
app.use(express.json());

// Routes
app.use("/api/profiles", profilesRouter);
app.use("/api/insights", insightsRouter);
app.use("/api/pending-actions", pendingActionsRouter);

export default app;
