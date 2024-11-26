import type { Request, Response } from "express";
import { ClubsService } from "../services/clubs-service";

export class ClubsController {
    async findMany(request: Request, response: Response) {
        const clubsService = new ClubsService();
        const data = await clubsService.findMany();

        response.status(data.statusCode).json(data.data);
    }
}