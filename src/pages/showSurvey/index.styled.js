import styled from "styled-components";

export const Container = styled.div``;

export const CardWrapper = styled.div`
  margin: 50px auto;
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

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 20px auto;
    margin-bottom: 50px;
    min-height: auto;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const SurveyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #339af0;
  @media screen and (max-width: 700px) {
    font-size: 1.2rem;
  }
`;

export const SurveyDescription = styled.p`
  align-self: flex-start;
  font-size: 1.2rem;
  font-style: italic;
  color: #339af0;
  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

export const ShareLinkMessage = styled.p`
  font-style: italic;
  justify-self: center;
  color: #1864ab;
  @media screen and (max-width: 700px) {
    font-size: 0.9rem;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    gap: 20px;
  }
`;

export const AnswerInfo = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: #1864ab;
  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

export const AuthorOfSurvey = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  color: #1864ab;
`;
