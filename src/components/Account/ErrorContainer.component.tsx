import React from "react";
import styled from "styled-components/native";

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`;
