import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DisplayPokemons from "./DisplayPokemons";
import Pokemon from "../types/Pokemon";

const GetPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
      );
      const { results } = response.data;
      const pokemonDetailsPromises = results.map(({ url }: { url: string }) =>
        axios.get(url).then(res => res.data)
      );
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      setPokemons(prevPokemons => [...prevPokemons, ...pokemonDetails]);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 10 && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <DisplayPokemons pokemons={pokemons} />
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default GetPokemons;
