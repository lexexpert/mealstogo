import styled from "styled-components/native";
import { Card, Text } from "react-native-paper";
import { ThemeType } from "../../theme";

type Props = {
  theme: ThemeType;
};

export const RestaurantCardStyled = styled(Card)<Props>`
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;

export const RestaurantCardCover = styled(Card.Cover)<Props>`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;

export const Address = styled(Text)<Props>`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const Rating = styled.View<Props>`
  flex-direction: row;
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[2]};
`;

export const Section = styled.View<Props>`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View<Props>`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Icon = styled.Image<Props>`
  width: 15px;
  height: 15px;
`;
