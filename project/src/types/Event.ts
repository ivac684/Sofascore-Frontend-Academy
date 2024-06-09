export interface Event {
    id: number;
    slug: string;

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
    homeTeam: {
      id: number;
      name: string;

      country: {
        id: number;
        name: string;
      };
    };
    awayTeam: {
      id: number;
      name: string;
      
      country: {
        id: number;
        name: string;
      };
    };
    status: string;
    startDate: string;
    homeScore: {
      total: number;
      period1: number;
      period2: number;
      period3: number;
      period4: number;
      overtime: number;
    };
    awayScore: {
      total: number;
      period1: number;
      period2: number;
      period3: number;
      period4: number;
      overtime: number;
    };
    winnerCode: string;
    round: number;
  }
  