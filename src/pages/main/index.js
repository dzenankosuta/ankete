import React, { useState } from "react";
import {
  CardWrapper,
  Container,
  ChooseWrapper,
  ChooseButton,
} from "./index.styled";
import NewSurvey from "../../components/newSurvey";
import Surveys from "../../components/surveys";

export default function Home() {
  const [tab, setTab] = useState("surveys");
  const activeButton = { backgroundColor: "#c5dff8", borderRadius: "10px" };

  return (
    <Container>
      <ChooseWrapper>
        <ChooseButton
          onClick={() => setTab("surveys")}
          style={tab === "surveys" ? activeButton : {}}
        >
          Ankete
        </ChooseButton>
        <ChooseButton
          onClick={() => setTab("newSurvey")}
          style={tab === "newSurvey" ? activeButton : {}}
        >
          Nova Anketa
        </ChooseButton>
      </ChooseWrapper>
      <CardWrapper>
        {tab === "newSurvey" ? <NewSurvey /> : <Surveys />}
      </CardWrapper>
    </Container>
  );
}
