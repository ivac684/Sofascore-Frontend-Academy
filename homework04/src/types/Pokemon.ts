interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    stats: {
      base_stat: number;
    }[];
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
    sprites: {
      front_default: string;
      back_default: string;
      other: {
        'official-artwork': {
          front_default: string;
          front_shiny: string;
        };
      };
    };
  }

export default Pokemon;