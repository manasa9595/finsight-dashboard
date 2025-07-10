import express from "express";
import pendingActionsRouter from "./routes/pendingActions";

const app = express();

app.use(express.json());
app.use("/pendingActions", pendingActionsRouter);

export default app;
