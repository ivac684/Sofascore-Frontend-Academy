import React, { useEffect, useState } from 'react';
import HandleBookmark from './HandleBookmark';
import { AnimatePresence } from 'framer-motion';
import * as styledTheme from '../theme/styledTheme';
import Pokemon from '../types/Pokemon';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../theme';

const NavBar = ({ bookmarks, setBookmarks, toggleTheme }: { bookmarks: Pokemon[]; setBookmarks: React.Dispatch<React.SetStateAction<Pokemon[]>>; toggleTheme: () => void; }) => {
  const [showBookmarkedPokemons, setShowBookmarkedPokemons] = useState(false);
  const [isCatchingPokemon, setIsCatchingPokemon] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [bookmarkCopy, setBookmarksCopy] = useState<Pokemon[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  useEffect(() => {
    setBookmarksCopy(bookmarks)
  }, [bookmarks]);
  
  const handleCatchingPokemonClick = () => {
    setIsCatchingPokemon(!isCatchingPokemon);
  };

  const toggleBookmarkedPokemons = () => {
    setShowBookmarkedPokemons(prevState => !prevState);
    if(showBookmarkedPokemons){
      localStorage.setItem('pokemonBookmarks', JSON.stringify(bookmarkCopy)); 
      setBookmarks(bookmarkCopy); 
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  const toggleLightTheme = () => {
    if(isDarkTheme){
      setIsDarkTheme((prevTheme) => !prevTheme);
      toggleTheme && toggleTheme();
    }
  };
  const toggleDarkTheme = () => {
    if(!isDarkTheme){
      setIsDarkTheme((prevTheme) => !prevTheme);
      toggleTheme && toggleTheme();
    }
  };
  

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
    <styledTheme.NavBarLayout>
      <styledTheme.IconContainer>
        <styledTheme.StyledHeart onClick={toggleBookmarkedPokemons} />
        {isCatchingPokemon ? (
          <styledTheme.StyledCatchingPokemon onClick={handleCatchingPokemonClick} />
        ) : (
          <styledTheme.StyledPokemon onClick={handleCatchingPokemonClick} />
        )}
        <styledTheme.StyledSettings onClick={toggleDropdown} />
        <AnimatePresence>
          {showDropdown && (
             <styledTheme.DropdownMenu initial={{ opacity: 0 }} animate={{ opacity: showDropdown ? 1 : 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <b>Theme</b>
              <styledTheme.DropdownItem onClick={toggleLightTheme}>Light</styledTheme.DropdownItem>
              <styledTheme.DropdownItem onClick={toggleDarkTheme}>Dark</styledTheme.DropdownItem>
            </styledTheme.DropdownMenu>
          )}
        </AnimatePresence>
      </styledTheme.IconContainer>
      <AnimatePresence>
        {showBookmarkedPokemons && (
          <styledTheme.FavoritesContainer
            initial={{ y: '200%' }}
            animate={{ y: '0%' }}
            exit={{ y: '200%' }}
            transition={{ duration: 0.9, ease: 'linear' }}
          >
            {bookmarks.length === 0 ? (
              <styledTheme.NoPokemons>No pokemons</styledTheme.NoPokemons>
            ) : (
              bookmarks.map((pokemon, index) => (
                <styledTheme.PokemonItem key={pokemon.name}>
                  <styledTheme.PokemonImageNav src={pokemon.sprites.other['official-artwork'].front_shiny} alt={pokemon.name} />
                  <styledTheme.PokemonNameNav>#{String(index + 1).padStart(4, '0')}: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</styledTheme.PokemonNameNav>
                  <HandleBookmark
                    pokemon={pokemon}
                    bookmarks={bookmarkCopy}
                    setBookmarks={setBookmarksCopy}
                    isModal={true}
                    style={{ position: 'absolute', top: '5px', right: '10px', width: '10%' }}
                  />
                </styledTheme.PokemonItem>
              ))
            )}
            <styledTheme.CloseIcon onClick={toggleBookmarkedPokemons}>X</styledTheme.CloseIcon>
          </styledTheme.FavoritesContainer>
        )}
      </AnimatePresence>
    </styledTheme.NavBarLayout>
    </ThemeProvider>
  );
};

export default NavBar;