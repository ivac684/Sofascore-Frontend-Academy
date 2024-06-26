export interface Team {
    id: number;
    name: string;
    country: {
        id: number;
        name: string;
    };
    managerName: string;
    venue: string;
};
