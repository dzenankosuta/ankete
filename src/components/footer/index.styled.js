import styled from "styled-components";

export const StyledFooter = styled.footer`
  height: 20vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid #339af0;
  box-shadow: 0 0 10px #339af0;
  @media screen and (max-width: 700px) {
    height: 30vh;
    padding: 10px;
    margin: 0;
  }
`;

export const StyledText = styled.p`
  font-size: 1rem;
  font-style: italic;
  text-align: center;
  @media screen and (max-width: 700px) {
    font-size: 0.8rem;
  }
`;
