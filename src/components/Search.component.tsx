import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { LocationContext } from "../services/location/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[3]};
`;

type SearchProps = {
  isFavouritesToggled: boolean;
  onFavouritesToggle: () => void;
};
export const Search = ({
  isFavouritesToggled,
  onFavouritesToggle,
}: SearchProps) => {
  const { keyword, onSearch } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        value={searchKeyword}
        placeholder="Search for a location"
        onSubmitEditing={() => {
          onSearch(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
