export interface Tournament {
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
  numberOfCompetitors: number;
  headToHeadCount: number;
}
