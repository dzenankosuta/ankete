import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  height: 12vh;
  border-bottom: 1px solid #339af0;
  box-shadow: 0 0 10px #339af0;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    padding: 0 15px;
  }
`;

export const StyledLinkWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 40px;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 700px) {
    gap: 10px;
  }
`;

export const StyledLogo = styled.img`
  height: 70px;
  @media screen and (max-width: 700px) {
    height: 50px;
  }
`;

export const StyledLink = styled(NavLink)`
  color: #339af0;
  text-decoration: none;
  font-size: 1.5rem;
  padding: 10px;
  @media screen and (max-width: 700px) {
    font-size: 1rem;
    padding: 0px;
  }
`;

export const StyledLogoutButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  background-color: #339af0;
  color: #fff;
  font-size: 1.3rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #1864ab;
  }
  @media screen and (max-width: 700px) {
    font-size: 1rem;
    padding: 10px;
  }
`;
