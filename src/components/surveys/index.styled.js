import styled from "styled-components";

export const SurveyPaginationWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    min-height: 500px;
  }
`;

export const SurveyWrapper = styled.div`
  width: 100%;
`;

export const NoSurveyContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

export const NoSurveyMessage = styled.p`
  font-size: 1.3rem;
  background-color: #c5dff8;
  color: #339af0;
  text-align: center;
  padding: 0.3rem 1rem;
  border-radius: 10px;
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const EditSurveyText = styled.p`
  display: flex;
  justify-content: center;
`;
