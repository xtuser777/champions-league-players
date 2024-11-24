import type { CreatePlayerDTO } from "../dtos/create-player-dto";
import type { UpdatePlayerDTO } from "../dtos/update-player-dto";
import { StatusCode } from "../enums/status-code";
import type { Player } from "../models/player";
import type { ResponseData } from "../models/response-data";
import { PlayersRepository } from "../repositories/players-repository";

export class PlayersService {
	private readonly playersRepository: PlayersRepository;
	constructor() {
		this.playersRepository = new PlayersRepository();
	}

	async findMany(): Promise<ResponseData<Player[]>> {
		const data = await this.playersRepository.findMany();

		const statusCode = data ? StatusCode.OK : StatusCode.NO_CONTENT;

		return {
			statusCode,
			data,
		};
	}

	async findOne(id: number): Promise<ResponseData<Player | undefined>> {
		const data = await this.playersRepository.findOne(id);

		const statusCode = data ? StatusCode.OK : StatusCode.NOT_FOUND;

		return {
			statusCode,
			data,
		};
	}

	async create(
		dto: CreatePlayerDTO,
	): Promise<ResponseData<number | undefined>> {
		if (Object.keys(dto).length === 5) {
			const player: Player = {
				id: 1,
				...dto,
			};
			await this.playersRepository.create(player);

			return {
				statusCode: StatusCode.CREATED,
				data: player.id,
			};
		}

		return {
			statusCode: StatusCode.BAD_REQUEST,
			data: undefined,
		};
	}

    async delete(id: number): Promise<ResponseData<void>> {
        let statusCode: StatusCode = StatusCode.NO_CONTENT;
        const exists = await this.playersRepository.exists(id);
        if (!exists) {
            statusCode = StatusCode.NOT_FOUND;
        }

        const isDeleted = await this.playersRepository.delete(id);
        if (!isDeleted) {
            statusCode = StatusCode.BAD_REQUEST;
        }

        return {
            statusCode,
            data: undefined,
        };
    }

    async update(id: number, dto: UpdatePlayerDTO): Promise<ResponseData<void>> {
		if (Object.keys(dto).length === 7) {
			const player = await this.playersRepository.findOne(id);
            if (!player) {
                return {
                    statusCode: StatusCode.NOT_FOUND,
                    data: undefined,
                };
            }

            player.statistics = { ...dto };

            let statusCode = StatusCode.NO_CONTENT;
			const isUpdated = await this.playersRepository.update(id, player);

            if(!isUpdated) {
                statusCode = StatusCode.BAD_REQUEST;
            }

			return {
				statusCode,
				data: undefined,
			};
		}

		return {
			statusCode: StatusCode.BAD_REQUEST,
			data: undefined,
		};
	}
}
