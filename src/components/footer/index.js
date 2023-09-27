import React from "react";
import { StyledFooter, StyledLogo, StyledText } from "./index.styled";
import logo from "../../assets/oscelogo.png";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledText>
        Izradu ove veb aplikacije podržala je Misija OEBS-a u Srbiji. Stavovi
        izrečeni pripadaju isključivo autoru i njegovim saradnicima i ne
        predstavljaju nužno zvaničan stav Misije OEBS-a u Srbiji. Svi pojmovi
        koji su u analizi upotrebljeni u muškom gramatičkom rodu obuhvataju
        muški i ženski rod lica na koja se odnose.
      </StyledText>
      <StyledLogo src={logo} alt="osce" />
    </StyledFooter>
  );
}
