import React from "react";
import { ButtonProps, Button as PaperButton } from "react-native-paper";
import { colors } from "../theme/colors";

export const Button = (props: ButtonProps) => {
  return (
    <PaperButton
      buttonColor={colors.brand.primary}
      mode={props.mode ?? "contained"}
      {...props}
    >
      {props.children}
    </PaperButton>
  );
};
