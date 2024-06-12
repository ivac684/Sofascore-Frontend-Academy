export interface EventIncident {
  player: {
      id: number;
      name: string;
      slug: string;
      country: {
          id: number;
          name: string;
      };
      position: string;
  };
  scoringTeam: 'home' | 'away';
  homeScore: number;
  awayScore: number;
  goalType: string;
  id: number;
  time: number;
  type: 'goal' | string;
}