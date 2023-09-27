import React from "react";
import { StyledCustomButton } from "./index.styled";

export default function CustomButton({ type, text, onClick, size, disabled }) {
  return (
    <>
      <StyledCustomButton
        type={type}
        disabled={disabled}
        size={size}
        onClick={onClick}
      >
        {text}
      </StyledCustomButton>
    </>
  );
}
