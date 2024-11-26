import type { Club } from "./club";

export type Player = {
    id: number;
    name: string;
    club: Club;
    nationality: string;
    position: string;
    statistics: {
        id: number;
        overall: number;
        pace: number;
        shooting: number;
        passing: number;
        dribbling: number;
        defending: number;
        physical: number;
    };
};
