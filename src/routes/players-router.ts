import {Router} from "express";
import { PlayersController } from "../controllers/players-controller";

const playersRouter = Router();

const controller = new PlayersController();

playersRouter.get("/", controller.findMany);
playersRouter.get("/:id", controller.findOne);
playersRouter.post("/", controller.create);
playersRouter.delete("/:id", controller.delete);
playersRouter.patch("/:id", controller.update);

export default playersRouter;