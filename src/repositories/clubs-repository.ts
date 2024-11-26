import { Database } from "../data/database";
import type { Club } from "../models/club";
import fs from "node:fs/promises";

export class ClubsRepository {
	async findMany(): Promise<Club[]> {
		let clubs: Club[] = [];

		try {
			const db = await Database.getInstance().getConnection();
			const result = await db.all("SELECT * FROM clubs");
			if (result)
				clubs = result.map((row) => ({
					...row,
				}));
		} catch (error) {
			console.error(error);
			throw new Error("Erro ao processar a consulta.");
		} finally {
			await Database.getInstance().close();
		}

		return clubs;
	}
}
