import type { Request, Response } from "express";
import { PlayersService } from "../services/players-service";
import type { CreatePlayerDTO } from "../dtos/create-player-dto";
import type { UpdatePlayerDTO } from "../dtos/update-player-dto";

export class PlayersController {
    async findMany(request: Request, response: Response) {
        const playersService = new PlayersService();
        const data = await playersService.findMany();

        response.status(data.statusCode).json(data.data);
    }
    async findOne(request: Request, response: Response) {
        const playersService = new PlayersService();
        const id = request.params.id;
        const data = await playersService.findOne(Number.parseInt(id));

        response.status(data.statusCode).json(data.data);
    }
    async create(request: Request, response: Response) {
        const playersService = new PlayersService();
        const dto: CreatePlayerDTO = request.body;
        const data = await playersService.create(dto);

        response.status(data.statusCode).json(data.data);
    }
    async delete(request: Request, response: Response) {
        const playersService = new PlayersService();
        const id = request.params.id;
        const data = await playersService.delete(Number.parseInt(id));

        response.status(data.statusCode).json(data.data);
    }
    async update(request: Request, response: Response) {
        const playersService = new PlayersService();
        const id = request.params.id;
        const dto: UpdatePlayerDTO = request.body;
        const data = await playersService.update(Number.parseInt(id), dto);

        response.status(data.statusCode).json(data.data);
    }
}