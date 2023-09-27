import React, { useContext } from "react";
import {
  StyledHeader,
  StyledLink,
  StyledLinkWrapper,
  StyledLogo,
  StyledLogoutButton,
} from "./index.styled";
import { AppContext } from "../../context";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const { token, setToken, setUser } = useContext(AppContext);
  const classicStyles = {};
  const activeStyles = {
    backgroundColor: "#339af0",
    color: "#fff",
    padding: "7px",
    borderRadius: "10px",
  };
  return (
    <StyledHeader>
      <StyledLink to="/">
        <StyledLogo src={logo} alt="logo" />
      </StyledLink>
      <StyledLinkWrapper>
        {token && (
          <>
            <StyledLogoutButton
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
                setToken(null);
                window.location.href = "/login";
              }}
            >
              Odjava
            </StyledLogoutButton>
          </>
        )}
        {!token && (
          <StyledLink
            to="/login"
            style={({ isActive }) => (isActive ? activeStyles : classicStyles)}
          >
            Prijava
          </StyledLink>
        )}
      </StyledLinkWrapper>
    </StyledHeader>
  );
}
