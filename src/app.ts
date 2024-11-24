import express from "express";
import playersRouter from "./routes/players-router";

function createApp() {
    const app = express();

    app.use(express.json());
    app.use("/players", playersRouter);

    return app;
}

export default createApp;