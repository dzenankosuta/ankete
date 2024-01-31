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
  ShareLinkMessage,
  SuccessContainer,
  Wrapper,
} from "./index.styled";
import {
  IconPlus,
  IconTrash,
  IconPencil,
  IconCheck,
  IconX,
  IconCopy,
} from "@tabler/icons-react";
import { createSurvey } from "../../services/survey";
import { AppContext } from "../../context/index";
import { Notification } from "@mantine/core";
import Spinner from "../spinner";
import CustomButton from "../customButton";

export default function NewSurvey() {
  const [id, setId] = useState(0);
  const { addSurvey, user, newSurveyData, setNewSurveyData } =
    useContext(AppContext);
  const currentURL = window.location.href;
  const newURL = currentURL.concat("submit-survey", "/", id);
  const [isCopied, setIsCopied] = useState(false);
  const [title, setTitle] = useState(newSurveyData.title);
  const [description, setDescription] = useState(newSurveyData.description);
  const [questions, setQuestions] = useState(newSurveyData.questions);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: addNewSurvey, isLoading } = useMutation(
    (values) => createSurvey(localStorage.getItem("token"), values),
    {
      onSuccess: (res) => {
        setId(res.id);
        addSurvey(res);
        setTitle("");
        setDescription("");
        setQuestions([]);
        setNewSurveyData({ title: "", questions: [] });
        setShowErrorNotification(false);
        setShowSuccessNotification(true);
      },
      onError: () => {
        setId(0);
        setShowErrorNotification(true);
        setShowSuccessNotification(false);
      },
    }
  );

  const copyURLToClipboard = (url) => {
    const urlToCopy = url;
    const textArea = document.createElement("textarea");
    textArea.value = urlToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

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
    setNewSurveyData({ ...newSurveyData, title: e.target.value });
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
    setNewSurveyData({ ...newSurveyData, description: e.target.value });
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      title: e.target.value,
      options: [""],
      optional: false,
    };
    setQuestions(updatedQuestions);
    setNewSurveyData({ ...newSurveyData, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (questionIndex, e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
    setNewSurveyData({ ...newSurveyData, questions: updatedQuestions });
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[answerIndex] = e.target.value;
    setQuestions(updatedQuestions);
    setNewSurveyData({ ...newSurveyData, questions: updatedQuestions });
    updateErrorMessage(); // Izmene odgovora - provera greške
  };

  const handleDeleteAnswer = (questionIndex, answerIndex, e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
    setNewSurveyData({ ...newSurveyData, questions: updatedQuestions });
    updateErrorMessage(); // Brisanje odgovora - provera greške
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: "", options: [""], optional: false }]);
    setNewSurveyData({
      ...newSurveyData,
      questions: [...questions, { title: "", options: [""], optional: false }],
    });
  };

  const handleOptionalChange = (questionIndex, e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].optional =
      !updatedQuestions[questionIndex].optional;

    setQuestions(updatedQuestions);
    setNewSurveyData({ ...newSurveyData, questions: updatedQuestions });
  };

  const handleAddAnswerOption = (questionIndex, e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
    setNewSurveyData({ ...newSurveyData, questions: updatedQuestions });
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

    const date = new Date();

    const stringDate = date.toLocaleString("sr-RS", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Belgrade",
    });

    const surveyData = {
      id: 0,
      title: title,
      author: user.username,
      is_active: true,
      question: updatedQuestions,
      created_at: stringDate,
      description: description,
    };
    try {
      addNewSurvey(surveyData);
    } catch (error) {}
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
      {isLoading && <Spinner message="Dodavanje ankete..." />}
      {!showSuccessNotification && (
        <Form
          onSubmit={handleSubmit}
          style={{ display: isLoading ? "none" : "flex" }}
        >
          <FieldWrapper>
            <Label>Naslov</Label>
            <Input
              type="text"
              value={title}
              placeholder="Naslov ankete..."
              onChange={handleTitleChange}
            />
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
              onClick={handleAddQuestion}
              text={"Dodaj pitanje"}
            />
          </AddQuestionDiv>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <CustomButton
            type={"submit"}
            text={"Dodaj"}
            disabled={!isFormValid() || errorMessage}
          />
        </Form>
      )}
      <MessageContainer>
        {!!showSuccessNotification && !isLoading && (
          <SuccessContainer>
            <CustomButton
              onClick={() => copyURLToClipboard(newURL)}
              text={
                <p>
                  <IconCopy /> {"  "}
                  Kopiraj link za popunjavanje ankete
                </p>
              }
              size={"large"}
            />
            {isCopied && (
              <ShareLinkMessage>Link je kopiran u Clipboard!</ShareLinkMessage>
            )}
            <Notification
              icon={<IconCheck size="1.1rem" />}
              color="teal"
              title="Uspešno dodata anketa!"
              onClose={handleCloseSuccessNotification}
            >
              Uspešno ste dodali anketu.
            </Notification>
          </SuccessContainer>
        )}
        {!!showErrorNotification && !isLoading && (
          <Notification
            icon={<IconX size="1.1rem" />}
            color="red"
            title="Greška prilikom dodavanja ankete!"
            onClose={handleCloseErrorNotification}
          >
            Došlo je do greške prilikom dodavanja ankete. Molimo vas pokušajte
            ponovo.
          </Notification>
        )}
      </MessageContainer>
    </>
  );
}
