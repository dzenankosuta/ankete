import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import {
  AddOptionButton,
  AddQuestionDiv,
  AnswerInput,
  AnswerWrapper,
  ErrorMessage,
  FieldWrapper,
  Form,
  IconAnswerDelete,
  IconAnswerOptional,
  IconQuestionDelete,
  Input,
  Label,
  MessageContainer,
  QuestionWrapper,
  Wrapper,
} from "./index.styled";
import {
  IconPlus,
  IconTrash,
  IconPencil,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { updateSurvey } from "../../services/survey";
import { AppContext } from "../../context/index";
import { Notification } from "@mantine/core";
import Spinner from "../spinner";
import CustomButton from "../customButton";

export default function EditSurvey({
  id,
  surveyTitle,
  surveyDescription,
  surveyAuthor,
  surveyCreatedAt,
  surveyQuestions,
}) {
  const [title, setTitle] = useState(surveyTitle);
  const [description, setDescription] = useState(surveyDescription);
  const [questions, setQuestions] = useState(surveyQuestions);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { token } = useContext(AppContext);

  const { mutate: editSurvey, isLoading } = useMutation(
    (values) => updateSurvey(token, id, values),
    {
      onSuccess: (res) => {
        setTitle("");
        setQuestions([]);
        setShowErrorNotification(false);
        setShowSuccessNotification(true);
      },
      onError: () => {
        setShowSuccessNotification(false);
        setShowErrorNotification(true);
      },
    }
  );

  const hasQuestions = () => {
    return (
      questions.length > 0 &&
      questions.some((question) => question.title.trim() !== "")
    );
  };

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
  };

  const handleCloseErrorNotification = () => {
    setShowErrorNotification(false);
  };

  const updateErrorMessage = () => {
    if (title.trim() === "") {
      setErrorMessage("Morate uneti naslov ankete.");
      return;
    }

    setErrorMessage("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (
      e.target.value.trim() !== "" &&
      errorMessage === "Morate uneti naslov ankete."
    ) {
      setErrorMessage("");
      return;
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      title: e.target.value,
      options: [""],
      optional: false,
    };
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (questionIndex, e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[answerIndex] = e.target.value;
    setQuestions(updatedQuestions);
    updateErrorMessage(); // Izmene odgovora - provera greške
  };

  const handleDeleteAnswer = (questionIndex, answerIndex, e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
    updateErrorMessage(); // Brisanje odgovora - provera greške
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: "", options: [""], optional: false }]);
  };

  const handleOptionalChange = (questionIndex, e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].optional =
      !updatedQuestions[questionIndex].optional;

    setQuestions(updatedQuestions);
  };

  const handleAddAnswerOption = (questionIndex, e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
    updateErrorMessage(); // Dodavanje odgovora - provera greške
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setErrorMessage("Morate uneti naslov ankete.");
      return;
    }

    if (!hasQuestions()) {
      setErrorMessage("Morate dodati bar jedno pitanje.");
      return;
    }

    const updatedQuestions = questions.filter(
      (question) => question.title.trim() !== ""
    );
    const surveyData = {
      id: id,
      title: title,
      author: surveyAuthor,
      is_active: true,
      question: updatedQuestions,
      created_at: surveyCreatedAt,
      description: description,
    };
    try {
      editSurvey(surveyData);
    } catch (error) {
      setErrorMessage(
        "An error occurred while updating the survey. Please try again later."
      );
    }
  };

  const isFormValid = () => {
    // Check if any question is empty
    const emptyQuestionIndex = questions.findIndex(
      (question) => question.title.trim() === ""
    );
    if (emptyQuestionIndex !== -1) {
      return false;
    }
    return true;
  };
  return (
    <>
      {isLoading && <Spinner message="Ažuriranje ankete..." />}
      {!showSuccessNotification && (
        <Form
          onSubmit={handleSubmit}
          style={{ display: isLoading ? "none" : "flex" }}
        >
          <FieldWrapper>
            <Label>Naslov</Label>
            <Input type="text" value={title} onChange={handleTitleChange} />
          </FieldWrapper>
          <FieldWrapper>
            <Label>Opis</Label>
            <Input
              type="text"
              value={description}
              placeholder="Opciono"
              onChange={handleDescriptionChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label>Pitanje:</Label>
            {questions.map((question, questionIndex) => (
              <Wrapper key={questionIndex}>
                <QuestionWrapper>
                  <IconAnswerOptional
                    onClick={(e) => {
                      handleOptionalChange(questionIndex, e);
                    }}
                    style={{
                      color: !!question.optional ? "#f79800" : "#1864ab",
                    }}
                  >
                    <IconPencil />
                  </IconAnswerOptional>
                  <Input
                    type="text"
                    value={question.title}
                    onChange={(e) => handleQuestionChange(questionIndex, e)}
                  />
                  <IconQuestionDelete
                    onClick={(e) => handleDeleteQuestion(questionIndex, e)}
                  >
                    <IconTrash />
                  </IconQuestionDelete>
                </QuestionWrapper>
                {question.options.map((answer, answerIndex) => (
                  <AnswerWrapper key={answerIndex}>
                    <AnswerInput
                      type="text"
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(questionIndex, answerIndex, e)
                      }
                      placeholder="Mogući odgovor..."
                      disabled={question.title.trim() === ""}
                    />
                    <IconAnswerDelete
                      onClick={(e) =>
                        handleDeleteAnswer(questionIndex, answerIndex, e)
                      }
                    >
                      <IconTrash />
                    </IconAnswerDelete>
                  </AnswerWrapper>
                ))}
                <AddOptionButton
                  onClick={(e) => handleAddAnswerOption(questionIndex, e)}
                  disabled={question.title.trim() === ""}
                >
                  <IconPlus color="#ffffff" />
                  <p>Dodaj mogući odgovor</p>
                </AddOptionButton>
              </Wrapper>
            ))}
          </FieldWrapper>
          <AddQuestionDiv>
            <CustomButton
              type={"button"}
              text={"Dodaj pitanje"}
              onClick={handleAddQuestion}
            />
          </AddQuestionDiv>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <CustomButton
            type={"submit"}
            disabled={!isFormValid() || errorMessage}
            text={"Ažuriraj"}
          />
        </Form>
      )}
      <MessageContainer>
        {!!showSuccessNotification && (
          <Notification
            icon={<IconCheck size="1.1rem" />}
            color="teal"
            title="Uspešno ažurirana anketa!"
            onClose={handleCloseSuccessNotification}
          >
            Uspešno ste ažurirali anketu.
          </Notification>
        )}
        {!!showErrorNotification && (
          <Notification
            icon={<IconX size="1.1rem" />}
            color="red"
            title="Greška prilikom ažuriranja ankete!"
            onClose={handleCloseErrorNotification}
          >
            Došlo je do greške prilikom ažuriranja ankete. Molimo vas pokušajte
            ponovo.
          </Notification>
        )}
      </MessageContainer>
    </>
  );
}
