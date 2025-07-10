import express from "express";
import serverless from "serverless-http";
import profiles from "../routes/profiles";

const app = express();
app.use("/api/profiles", profiles);

export default serverless(app);
