import express from "express";
import playersRouter from "./routes/players-router";
import clubsRouter from "./routes/clubs-router";
import cors from "cors";

function createApp() {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use("/players", playersRouter);
    app.use("/clubs", clubsRouter);

    return app;
}

export default createApp;