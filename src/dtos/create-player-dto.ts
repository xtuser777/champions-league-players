export type CreatePlayerDTO = {
    name: string;
    club: {
        id: number;
        name: string;
    };
    nationality: string;
    position: string;
    statistics: {
        overall: number;
        pace: number;
        shooting: number;
        passing: number;
        dribbling: number;
        defending: number;
        physical: number;
    };
};