export interface Player {
    id: number;
    name: string;
    slug: string;
    country: {
      id: number;
      name: string;
    };
    position: string;
    dateOfBirth: string
  }
  