import styled from "styled-components";
import { Input } from "@mantine/core";

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledLoginWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLoginCard = styled.div`
  margin-top: 100px;
  width: 450px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #339af0;
  padding: 20px;

  @media screen and (max-width: 700px) {
    width: 300px;
    min-height: 320px;
    margin-top: 80px;
    margin-bottom: 50px;
    gap: 20px;
  }
`;

export const StyledLoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1864ab;
  @media screen and (max-width: 700px) {
    font-size: 1.5rem;
  }
`;

export const StyledErrorMessage = styled.p`
  color: #ff0000;
  font-style: italic;
`;

export const StyledInput = styled(Input)`
  width: 400px;
  @media screen and (max-width: 700px) {
    width: 250px;
  }
`;
