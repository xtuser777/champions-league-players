import { Router } from "express";
import { ClubsController } from "../controllers/clubs-controller";

const clubsRouter = Router();

const controller = new ClubsController();

clubsRouter.get("/", controller.findMany);

export default clubsRouter;
