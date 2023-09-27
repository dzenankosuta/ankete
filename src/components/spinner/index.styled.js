import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 1s linear infinite;
  @media screen and (max-width: 700px) {
    width: 30px;
    height: 30px;
  }
`;

export const StyledMessage = styled.div`
  margin-top: 16px;
  font-size: 18px;
  color: #555555;
  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
`;
