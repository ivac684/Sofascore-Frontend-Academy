import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import HandleBookmark from './HandleBookmark';
import GetFlavorText from './GetFlavorText';
import PokemonTypeTags from './PokemonTypeTags';
import * as styledTheme from '../theme/styledTheme';
import Pokemon from '../types/Pokemon';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../theme';

const Pokemons = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [bookmarks, setBookmarks] = useState<Pokemon[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
  

  return (
    <>
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
    <NavBar bookmarks={bookmarks} setBookmarks={setBookmarks} toggleTheme={toggleTheme} />
      <styledTheme.Container>
        {pokemons.map((pokemon, index) => (
          <styledTheme.PokemonRow key={pokemon.name}>
            {isSmallScreen ? (
              <styledTheme.PokemonColumnLeft>
                 <styledTheme.PokemonContainer>                        
                  <styledTheme.PokemonImage src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name}
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                  <HandleBookmark
                          pokemon={pokemon}
                          bookmarks={bookmarks}
                          setBookmarks={setBookmarks}
                          isModal={false}
                          style={{position: 'absolute', top:'10px', right: '10px'}}
                        />
                  <styledTheme.PokemonName>#{String(index + 1).padStart(4, '0')}: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</styledTheme.PokemonName>
                  <styledTheme.PokemonDescription>
                    <styledTheme.DescriptionItem><b>Health Points: </b> {pokemon.stats[0].base_stat} HP</styledTheme.DescriptionItem>
                    <styledTheme.DescriptionItem><b>Height: </b> {pokemon.height} cm</styledTheme.DescriptionItem>
                    <styledTheme.DescriptionItem><b>Weight: </b>{pokemon.weight} kg</styledTheme.DescriptionItem>
                    <styledTheme.DescriptionItem><b>Type:</b><PokemonTypeTags types={pokemon.types.map(({ type }) => type.name)} /></styledTheme.DescriptionItem>
                    <styledTheme.DescriptionItem><b>Details:</b> <GetFlavorText index={index + 1} /></styledTheme.DescriptionItem>
                  </styledTheme.PokemonDescription>
                </styledTheme.PokemonContainer>
              </styledTheme.PokemonColumnLeft>
            
            ) : (
              <>
                {index % 2 === 0 ? (
                  <>
                    <styledTheme.PokemonColumnLeft style={{ justifyContent: 'flex-end' }}>
                    <styledTheme.PokemonContainer>
                        <styledTheme.PokemonImage 
                        initial={{ x: '50%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                        <HandleBookmark
                          pokemon={pokemon}
                          bookmarks={bookmarks}
                          setBookmarks={setBookmarks}
                          isModal={false}
                          style={{position: 'absolute', top: '5px', right: '10px'}}
                        />
                      </styledTheme.PokemonContainer>
                    </styledTheme.PokemonColumnLeft>
                    <styledTheme.PokemonColumnRight>
                      <styledTheme.PokemonContainer>
                        <styledTheme.PokemonName>#{String(index + 1).padStart(4, '0')}: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</styledTheme.PokemonName>
                        <styledTheme.PokemonDescription
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.0 }}>
                          <styledTheme.DescriptionItem><b>Health Points: </b> {pokemon.stats[0].base_stat} HP</styledTheme.DescriptionItem>
                          <styledTheme.DescriptionItem><b>Height: </b> {pokemon.height} cm</styledTheme.DescriptionItem>
                          <styledTheme.DescriptionItem><b>Weight: </b>{pokemon.weight} kg</styledTheme.DescriptionItem>
                          <styledTheme.DescriptionItem><b>Type:</b><PokemonTypeTags types={pokemon.types.map(({ type }) => type.name)} /></styledTheme.DescriptionItem>
                          <styledTheme.DescriptionItem><b>Details:</b> <GetFlavorText index={index + 1} /></styledTheme.DescriptionItem>
                        </styledTheme.PokemonDescription>
                        <styledTheme.FullViewContainer
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 1.0 }}>
                          <styledTheme.FullViewText>Full view:</styledTheme.FullViewText>
                          <styledTheme.SmallImagesContainer>
                            <styledTheme.PokemonSmallImage src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
                            <styledTheme.PokemonSmallImage src={pokemon.sprites.back_default} alt={`${pokemon.name} end`} />
                          </styledTheme.SmallImagesContainer>
                        </styledTheme.FullViewContainer>
                      </styledTheme.PokemonContainer>
                    </styledTheme.PokemonColumnRight>
                  </>
                ) : (
                  <>
                    <styledTheme.PokemonColumnRight>
                      <styledTheme.PokemonContainer>
                        <styledTheme.PokemonName>#{String(index + 1).padStart(4, '0')}: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</styledTheme.PokemonName>
                        <styledTheme.PokemonDescription
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.0 }}>
                          <styledTheme.DescriptionItem><b>Health Points: </b> {pokemon.stats[0].base_stat} HP</styledTheme.DescriptionItem>
                          <styledTheme.DescriptionItem><b>Height: </b> {pokemon.height} cm</styledTheme.DescriptionItem>
                          <styledTheme.DescriptionItem><b>Weight: </b>{pokemon.weight} kg</styledTheme.DescriptionItem>
                          <styledTheme.DescriptionItem><b>Type:</b><PokemonTypeTags types={pokemon.types.map(({ type }) => type.name)} /></styledTheme.DescriptionItem>
                          <b>Details:</b> <GetFlavorText index={index + 1} />
                        </styledTheme.PokemonDescription>
                        <styledTheme.FullViewContainer
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 1.0 }}>
                          <styledTheme.FullViewText>Full view:</styledTheme.FullViewText>
                          <styledTheme.SmallImagesContainer>
                            <styledTheme.PokemonSmallImage src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
                            <styledTheme.PokemonSmallImage src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
                          </styledTheme.SmallImagesContainer>
                        </styledTheme.FullViewContainer>
                      </styledTheme.PokemonContainer>
                    </styledTheme.PokemonColumnRight>
                    <styledTheme.PokemonColumnLeft style={{ justifyContent: 'flex-start' }}>
                      <styledTheme.PokemonContainer>
                        <styledTheme.PokemonImage src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name}
                        initial={{ x: '-50%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        />
                        <HandleBookmark
                          pokemon={pokemon}
                          bookmarks={bookmarks}
                          setBookmarks={setBookmarks}
                          isModal={false}
                          style={{position: 'absolute', top: '5px', right: '99%'}}
                        />
                      </styledTheme.PokemonContainer>
                    </styledTheme.PokemonColumnLeft>
                  </>
                )}
              </>
            )}
          </styledTheme.PokemonRow>
        ))}
      </styledTheme.Container>
      </ThemeProvider>
    </>
  );
};

export default Pokemons;