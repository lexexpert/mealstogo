import React from "react";
import styled, { DefaultTheme } from "styled-components/native";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

const defaultTextStyles = (theme: DefaultTheme) => `
      font-family: ${theme.fonts.body};
      font-weight: ${theme.fontWeights.regular};
      color: ${theme.colors.text.primary};
      flex-wrap: wrap;
      margin-top: 0px;
      margin-bottom: 0px;
  `;

const body = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body}px;
  `;

const hint = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body}px;
  `;

const error = (theme: DefaultTheme) => `
    color: ${theme.colors.text.error};
  `;

const caption = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.caption}px;
    font-weight: ${theme.fontWeights.bold};
  `;

const label = (theme: DefaultTheme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.medium};
  `;

type VariantsType = {
  body: (theme: DefaultTheme) => string;
  label: (theme: DefaultTheme) => string;
  caption: (theme: DefaultTheme) => string;
  error: (theme: DefaultTheme) => string;
  hint: (theme: DefaultTheme) => string;
};

const variants: VariantsType = {
  body,
  label,
  caption,
  error,
  hint,
};

interface TextProps extends RNTextProps {
  variant?: keyof VariantsType;
}

export const Text: React.FC<TextProps> = styled(RNText)<TextProps>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant = "body", theme }) => variants[variant](theme)}
`;
