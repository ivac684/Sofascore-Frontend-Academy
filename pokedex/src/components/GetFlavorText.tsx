import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const FlavorTextContainer = styled.span`
word-wrap: break-word; 
`;

const GetFlavorText = ({ index }: { index: number }) => { 
  const [flavorText, setFlavorText] = useState("");

  useEffect(() => {
    const fetchFlavorText = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${index}`); 
        const speciesData = response.data;
        
        const englishFlavorTextEntry = speciesData.flavor_text_entries.find((entry : any) => entry.language.name === "en");
        
        if (englishFlavorTextEntry) {
          const cleanedFlavorText = englishFlavorTextEntry.flavor_text.replace(/\f/g, ' ');
          setFlavorText(cleanedFlavorText);
        } else {
          setFlavorText("Flavor text not available");
        }
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    };

    fetchFlavorText();
  }, [index]);

  return <FlavorTextContainer>{flavorText}</FlavorTextContainer>; 
};

export default GetFlavorText;
