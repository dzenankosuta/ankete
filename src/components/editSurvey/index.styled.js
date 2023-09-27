import styled from "styled-components";

export const Form = styled.form`
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
    width: 90%;
    margin: 20px auto;
    margin-bottom: 20px;
  }
`;

export const FieldWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  @media screen and (max-width: 700px) {
    font-size: 0.9rem;
  }
`;

export const Option = styled.option``;

export const IconAnswerOptional = styled.button`
  color: #1864ab;
  background-color: #c5dff8;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -35px;
  &:hover {
    color: #f79800;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 45px;
  border-radius: 5px;
  border: 1px solid #339af0;
  box-shadow: 0 0 3px #339af0;
  @media screen and (max-width: 700px) {
    font-size: 0.9rem;
    padding-right: 45px;
  }
`;

export const QuestionWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const AnswerWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const AnswerInput = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  padding-right: 45px;
  border-radius: 5px;
  border: 1px solid #ffdede;
  box-shadow: 0 0 1px #eb4747;
  @media screen and (max-width: 700px) {
    font-size: 0.9rem;
    padding-right: 45px;
  }
`;

export const IconQuestionDelete = styled.button`
  color: #1864ab;
  background-color: #c5dff8;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 7px;
  &:hover {
    color: #eb4747;
  }
`;

export const IconAnswerDelete = styled.button`
  color: #1864ab;
  background-color: #ffdede;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 17px;
  &:hover {
    color: #eb4747;
  }
`;

export const AddOptionButton = styled.button`
  width: 35%;
  padding: 3px;
  border-radius: 5px;
  background-color: #339af0;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin: 10px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:hover {
    background-color: #1864ab;
  }
  @media screen and (max-width: 700px) {
    width: 80%;
    font-size: 0.9rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #eb4747;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 0.9rem;
  font-style: italic;
`;

export const AddQuestionDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 700px) {
    margin-bottom: 15px;
  }
`;

export const MessageContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div``;
