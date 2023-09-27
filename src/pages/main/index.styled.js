import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ChooseWrapper = styled.div`
  margin-top: 50px;
  width: 650px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 2px #339af0;
  @media screen and (max-width: 700px) {
    width: 90%;
    height: 40px;
  }
`;

export const ChooseButton = styled.button`
  flex: 1;
  height: 50px;
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  color: #339af0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #1864ab;
  }
  @media screen and (max-width: 700px) {
    font-size: 1rem;
    height: 40px;
  }
`;

export const CardWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 100px;
  width: 650px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #339af0;
  padding: 20px;
  @media screen and (max-width: 700px) {
    width: 90%;
    min-height: 500px;
  }
`;
