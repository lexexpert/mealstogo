import { colors } from "./colors";
import { space, lineHeights } from "./spacing";
import { sizes } from "./sizes";
import { fonts, fontWeights, fontSizes } from "./fonts";
import { DefaultTheme } from "styled-components/native";

export const theme = {
  colors,
  space,
  lineHeights,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
};

export interface ThemeType extends DefaultTheme {
  colors: typeof colors;
  space: typeof space;
  lineHeights: typeof lineHeights;
  sizes: typeof sizes;
  fonts: typeof fonts;
  fontSizes: typeof fontSizes;
  fontWeights: typeof fontWeights;
}
