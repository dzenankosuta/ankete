import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

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
  @media screen and (max-width: 700px) {
    margin: 20px auto;
    width: 90%;
    margin: 20px auto;
    margin-bottom: 50px;
    min-height: 400;
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
  @media screen and (max-width: 700px) {
    gap: 10px;
  }
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

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    width: 90%;
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
  justify-self: center;
`;

export const SurveyMessage = styled.p`
  font-size: 1.3rem;
  justify-self: center;
  color: #1864ab;
  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

export const SurveyQuestion = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #339af0;
  margin-bottom: 10px;
  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

export const SubmitSurveyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
  @media screen and (max-width: 700px) {
    margin-top: 20px;
  }
`;

export const Button = styled.button`
  align-self: center;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #339af0;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #1864ab;
  }
`;

export const QuestionDiv = styled.div``;

export const AnswerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AnswerBtn = styled.button`
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #339af0;
  color: #fff;
  border: 1px solid #339af0;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #1864ab;
  }
`;

export const AnswerInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #fff;
  color: #1864ab;
  border: 1px solid #339af0;
  margin-bottom: 10px;
`;

export const SurveyErrorMessage = styled.p`
  margin: 10px 0px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #eb4747;
  text-align: center;
  font-style: italic;
`;
