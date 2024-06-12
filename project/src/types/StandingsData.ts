export interface StandingsData {
    
    id: number;
    tournament: {
      id: number;
      name: string;
      slug: string;
      sport: {
        id: number;
        name: string;
        slug: string;
      };
      country: {
        id: number;
        name: string;
      };
    };
    type: string
    sortedStandingsRows: {
      id: number;
      team: {
        id: number;
        name: string;
        country: {
          id: number;
          name: string;
        };
      };
      points: number;
      scoresFor: number;
      scoresAgainst: number;
      played: number;
      wins: number;
      draws: number;
      losses: number;
      percentage: number;
    }[];
  }
  