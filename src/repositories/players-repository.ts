import { Database } from "../data/database";
import type { Player } from "../models/player";

export class PlayersRepository {
	async findMany(): Promise<Player[]> {
		let players: Player[] = [];

		try {
			const db = await Database.getInstance().getConnection();
			const result = await db.all("SELECT * FROM players");
			if (result) {
				players = await Promise.all(
					result.map(async (row) => {
						const club = await db.all(
							"SELECT * FROM clubs WHERE id = ?",
							row.club_id,
						);
						const statistics = await db.all(
							"SELECT * FROM players_statistics WHERE id = ?",
							row.players_statistics_id,
						);
						return {
							...row,
							club,
							statistics,
						};
					}),
				);
			}
		} catch (error) {
			console.error(error);
			throw new Error("Erro ao processar a consulta.");
		} finally {
			await Database.getInstance().close();
		}

		return players;
	}

	async findOne(id: number): Promise<Player | undefined> {
		try {
			const db = await Database.getInstance().getConnection();
			const result = await db.get(
				"SELECT * FROM players WHERE id = ?",
				id,
			);

			let player: Player | undefined = undefined;

			if (result) {
                const club = await db.all(
                    "SELECT * FROM clubs WHERE id = ?",
                    result.club_id,
                );
                const statistics = await db.all(
                    "SELECT * FROM players_statistics WHERE id = ?",
                    result.players_statistics_id,
                );
				player = {
					...result,
                    club,
                    statistics,
				};
			}

			return player;
		} catch (error) {
			console.error(error);
			throw new Error("Erro ao processar a consulta.");
		} finally {
			await Database.getInstance().close();
		}
	}

	async create(player: Player): Promise<number | undefined> {
		try {
			const db = await Database.getInstance().getConnection();
            const resultStatistics = await db.run(
				"INSERT INTO players_statistics (overall,pace,shooting,passing,dribbling,defending,physical) VALUES (?,?,?,?,?,?,?)",
                player.statistics.overall,
                player.statistics.pace,
                player.statistics.shooting,
                player.statistics.passing,
                player.statistics.dribbling,
                player.statistics.defending,
                player.statistics.physical,
			);
			const result = await db.run(
				"INSERT INTO players (name, nationality, position, club_id, players_statistics_id) VALUES (?,?,?,?,?)",
				player.name,
                player.nationality,
                player.position,
                player.club.id,
                resultStatistics.lastID,
			);

			return result.lastID;
		} catch (error) {
			console.error(error);
			throw new Error("Erro ao processar a consulta.");
		} finally {
			await Database.getInstance().close();
		}
	}

	async delete(id: number) {
		try {
			const db = await Database.getInstance().getConnection();
			const result = await db.run(
				"DELETE FROM players WHERE id = ?",
				id,
			);
			return result.changes;
		} catch (error) {
			console.error(error);
			throw new Error("Erro ao processar a consulta.");
		} finally {
			await Database.getInstance().close();
		}
	}

	async update(player: Player) {
		try {
			const db = await Database.getInstance().getConnection();
            const resultStatistics = await db.run(
				"UPDATE players_statistics SET overall = ?, pace = ?, shooting = ?, passing = ?, dribbling = ?, defending = ?, physical = ? WHERE id = ?",
                player.statistics.overall,
                player.statistics.pace,
                player.statistics.shooting,
                player.statistics.passing,
                player.statistics.dribbling,
                player.statistics.defending,
                player.statistics.physical,
                player.statistics.id,
			);
			const result = await db.run(
				"UPDATE players SET name = ?, nationality = ?, position = ? WHERE id = ?",
				player.name,
                player.nationality,
                player.position,
                player.club.id,
                resultStatistics.lastID,
                player.id,
			);

			return result.changes;
		} catch (error) {
			console.error(error);
			throw new Error("Erro ao processar a consulta.");
		} finally {
			await Database.getInstance().close();
		}
	}

	async exists(id: number) {
		try {
			const db = await Database.getInstance().getConnection();
			const result = await db.get(
				"SELECT COUNT(*) as rows FROM players WHERE id = ?",
				id,
			);

			const rows = result.rows;

			return rows > 0;
		} catch (error) {
			console.error(error);
			throw new Error("Erro ao processar a consulta.");
		} finally {
			await Database.getInstance().close();
		}
	}
}
