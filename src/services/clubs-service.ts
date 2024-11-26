import { StatusCode } from "../enums/status-code";
import type { Club } from "../models/club";
import type { ResponseData } from "../models/response-data";
import { ClubsRepository } from "../repositories/clubs-repository";

export class ClubsService {
    private readonly clubsRepository: ClubsRepository;

    constructor() {
        this.clubsRepository = new ClubsRepository();
    }

    async findMany(): Promise<ResponseData<Club[]>> {
        const data = await this.clubsRepository.findMany();

        let statusCode = StatusCode.OK;

        if (data.length === 0) {
            statusCode = StatusCode.NO_CONTENT;
        }

        return {
            statusCode,
            data,
        };
    }
}