import { database } from "../data/database";
import type { Player } from "../models/player";

export class PlayersRepository {
    async findMany(): Promise<Player[]> {
        return database;
    }

    async findOne(id: number): Promise<Player | undefined> {
        return database.find(player => player.id === id);
    }

    async create(player: Player): Promise<void> {
        database.push(player);
    }

    async delete(id: number) {
        const index = database.findIndex((player) => player.id === id);

        if (index !== -1) {
            database.splice(index, 1);
            return true;
        }

        return false;
    }

    async update(id: number, player: Player): Promise<boolean> {
        const index = database.findIndex((player) => player.id === id);

        if (index !== -1) {
            database[index] = player;
            return true;
        }

        return false;
    }

    async exists(id: number): Promise<boolean> {
        const index = database.findIndex((player) => player.id === id);

        if (index !== -1) {
            return true;
        }

        return false;
    }
}