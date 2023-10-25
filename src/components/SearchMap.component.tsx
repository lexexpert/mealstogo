import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { LocationContext } from "../services/location/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[0]} ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: ${(props) => props.theme.space[5]};
  width: 100%;
`;

export const SearchMap = () => {
  const { keyword, onSearch } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        value={searchKeyword}
        icon="map"
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
