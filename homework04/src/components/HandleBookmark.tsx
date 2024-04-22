import React from "react";
import styled from "styled-components";
import { Heart } from "@styled-icons/entypo/Heart";
import Pokemon from "../types/Pokemon";

const HeartIcon = styled(Heart)`
  cursor: pointer;
  width: 30px;
`;

const HandleBookmark = ({
  pokemon,
  bookmarks,
  setBookmarks,
  isModal,
  style,
}: {
  pokemon: Pokemon;
  bookmarks: Pokemon[];
  setBookmarks: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  isModal: boolean;
  style?: React.CSSProperties;
}) => {
  const handleBookmark = () => {
    try {
      const updatedBookmarks = bookmarks.includes(pokemon)
        ? bookmarks.filter((bookmark) => bookmark.name !== pokemon.name)
        : [...bookmarks, pokemon];

      if (!isModal) {
        localStorage.setItem(
          "pokemonBookmarks",
          JSON.stringify(updatedBookmarks)
        );
      }
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error("Error during bookmark toggle:", error);
    }
  };

  return (
    <HeartIcon
      style={{
        ...style,
        color: bookmarks.includes(pokemon) ? "#E3350D" : "#B3B3B3",
      }}
      onClick={handleBookmark}
    />
  );
};

export default HandleBookmark;
