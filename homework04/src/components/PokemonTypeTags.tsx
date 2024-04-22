import styled from "styled-components";

const PokemonTypeTag = styled.span`
  display: inline;
  padding: 3px 25px;
  margin-left: 8px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
`;

const getTypeColor = (type: string) => {
  switch (type) {
    case "normal":
      return "#A8A878";
    case "fire":
      return "#F08030";
    case "water":
      return "#6890F0";
    case "grass":
      return "#78C850";
    case "electric":
      return "#F8D030";
    case "ice":
      return "#98D8D8";
    case "fighting":
      return "#C03028";
    case "ground":
      return "#E0C068";
    case "poison":
      return "#A040A0";
    case "flying":
      return "#A890F0";
    case "psychic":
      return "#F85888";
    case "ghost":
      return "#705898";
    case "steel":
      return "#B8B8D0";
    case "fairy":
      return "#F0B6BC";
    case "bug":
      return "#91C12F";
    case "dark":
      return "#5A5465";
    default:
      return "#000000";
  }
};

const PokemonTypeTags = ({ types }: { types: string[] }) => {
  return (
    <>
      {types.map((type, index) => (
        <PokemonTypeTag
          key={index}
          style={{ backgroundColor: getTypeColor(type) }}
        >
          {type}
        </PokemonTypeTag>
      ))}
    </>
  );
};

export default PokemonTypeTags;
