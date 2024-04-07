import styled from "styled-components";
import { motion } from "framer-motion";
import { HeartOutlined } from "@styled-icons/entypo/HeartOutlined";
import { Settings } from "@styled-icons/fluentui-system-regular";
import { CatchingPokemon } from "@styled-icons/material-outlined";
import { Pokemon } from "@styled-icons/simple-icons";
import { XDiamondFill } from "@styled-icons/bootstrap/XDiamondFill";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 70px;
`;

const PokemonImage = styled(motion.img)`
  width: 70%;
  height: auto;
  @media (max-width: 900px) {
    background-color: #d2d2d2;
    width: 100%;
  }
`;

const PokemonRow = styled.div`
  width: 1726px;
  display: flex;
  justify-content: center;
  @media (min-width: 901px) and (max-width: 950px) {
    margin: -10px;
    height: 350px;
}
`;

const PokemonColumnLeft = styled(motion.div)`
  background-color: ${(props) => props.theme.surfaceS1};
  flex: 1;
  display: flex;
  @media (max-width: 920px) {
    display: block;
  }
`;
const PokemonColumnRight = styled(motion.div)`
  background-color: ${(props) => props.theme.surfaceS2};
  flex: 1;
  display: flex;
  @media (max-width: 920px) {
    display: block;
  }
`;

const PokemonContainer = styled.div`
  margin: 5px;
  margin-left: 40px;
  position: relative;
  @media (max-width: 900px) {
    margin-left: 5px;
  }
`;

const PokemonName = styled.div`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  margin-top: 50px;
`;

const PokemonDescription = styled(motion.div)`
  color: ${(props) => props.theme.textColor};
  text-align: left;
  margin-top: 10px;
  width: 50%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const DescriptionItem = styled.div`
  margin-bottom: 10px;
`;

const FullViewText = styled.div`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  margin-right: 10px;
  margin-left: 100px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const PokemonSmallImage = styled.img``;

const FullViewContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -200px;
  margin-left: 30px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const SmallImagesContainer = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 180px;
  @media (max-width: 1200px) {
    margin-top: 0px;
  }
`;

const NavBarLayout = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${(props) => props.theme.navBackground};
  position: fixed;
  top: 0;
  z-index: 999;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-right: 20px;
`;

const FavoritesContainer = styled(motion.div)`
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.popupBackground};
  overflow: auto;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 850px;
  max-height: 600px;
  margin: 0 auto;
  margin-top: 15px;
`;

const PokemonItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const PokemonImageNav = styled.img`
  width: 200px;
  border-radius: 5px;
  border-top: 30px solid ${(props) => props.theme.favoritesBorder};
  border-bottom: 30px solid ${(props) => props.theme.favoritesBorder};
  border-left: 12px solid ${(props) => props.theme.favoritesBorder};
  border-right: 12px solid ${(props) => props.theme.favoritesBorder};
`;

const StyledSettings = styled(Settings)`
  width: 35px;
  margin-right: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    color: #ffca4a;
  }
`;

const StyledCatchingPokemon = styled(CatchingPokemon)`
  width: 35px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ffca4a;
  }
`;

const CloseIcon = styled(XDiamondFill)`
  position: absolute;
  width: 20px;
  top: 5px;
  right: 10px;
  cursor: pointer;
  color: #e3350d;
`;

const StyledHeart = styled(HeartOutlined)`
  margin-left: 40px;
  width: 35px;
  color: white;
  cursor: pointer;
  &:hover {
    color: #ffca4a;
  }
`;

const StyledPokemon = styled(Pokemon)`
  width: 70px;
  color: white;
  cursor: pointer;
  &:hover {
    color: #ffca4a;
  }
`;

const PokemonNameNav = styled.div`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.dropdownMenu};
  margin-top: 10px;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 10px;
  z-index: 1000;
  width: 15%;
`;

const NoPokemons = styled.div`
  margin-bottom: 20px;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  margin-top: 10px;
  margin-left: 15px;
  &:hover {
    color: #78c850;
  }
`;

export {
  Container,
  PokemonImage,
  PokemonRow,
  PokemonColumnRight,
  PokemonContainer,
  PokemonName,
  PokemonDescription,
  DescriptionItem,
  FullViewText,
  PokemonSmallImage,
  FullViewContainer,
  SmallImagesContainer,
  NavBarLayout,
  IconContainer,
  FavoritesContainer,
  PokemonItem,
  StyledSettings,
  StyledCatchingPokemon,
  CloseIcon,
  StyledHeart,
  StyledPokemon,
  DropdownMenu,
  NoPokemons,
  DropdownItem,
  PokemonNameNav,
  PokemonImageNav,
  PokemonColumnLeft,
};