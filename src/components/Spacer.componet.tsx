import React from "react";
import { View, ViewProps } from "react-native";
import styled from "styled-components";
import { theme } from "../theme";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

type Position = keyof typeof positionVariant;
type Size = keyof typeof sizeVariant;

const getVariant = (position: Position, size: Size) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];
  return `${property}: ${value}`;
};

type SpacerViewProps = {
  variant?: string;
} & ViewProps;

const SpacerView = styled(View)<SpacerViewProps>`
  ${({ variant }) => variant}
`;

type SpacerProps = {
  position?: Position;
  size?: Size;
  children?: React.ReactNode;
};

export const Spacer = ({
  position = "top",
  size = "small",
  children,
}: SpacerProps) => {
  const variant = getVariant(position, size);
  return <SpacerView {...{ variant }}>{children}</SpacerView>;
};
