export interface Tournament {
    id: number;
    name: string;
    slug: string;
    sport: Sport;
    country: Country;
  }
  
  export interface Sport {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface Country {
    id: number;
    name: string;
  }
  
  export interface Team {
    id: number;
    name: string;
    country: Country;
  }
  
  export interface Score {
    total: number;
    period1: number;
    period2: number;
    period3: number;
    period4: number;
    overtime: number;
  }
  
  export interface Match {
    id: number;
    slug: string;
    tournament: Tournament;
    homeTeam: Team;
    awayTeam: Team;
    status: 'notstarted' | 'inprogress' | 'finished';
    startDate: string; 
    homeScore: Score;
    awayScore: Score;
    winnerCode: 'home' | 'away' | 'draw';
    round: number;
  }
  