import express from "express";
import serverless from "serverless-http";
import pendingActions from "../routes/pendingActions";

const app = express();
app.use("/api/pending-actions", pendingActions);

export default serverless(app);
