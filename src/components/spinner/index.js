import React from "react";
import {
  StyledMessage,
  StyledSpinner,
  StyledSpinnerContainer,
} from "./index.styled";

const Spinner = ({ message }) => {
  return (
    <StyledSpinnerContainer>
      <StyledSpinner />
      {message && <StyledMessage>{message}</StyledMessage>}
    </StyledSpinnerContainer>
  );
};

export default Spinner;
