import React, { useEffect, useState } from "react";
import {
  AnswerBtn,
  AnswerDiv,
  AnswerInput,
  AuthorOfSurvey,
  Button,
  CardWrapper,
  Container,
  Header,
  InfoWrapper,
  QuestionDiv,
  SubmitSurveyWrapper,
  SurveyDescription,
  SurveyErrorMessage,
  SurveyMessage,
  SurveyQuestion,
  SurveyTitle,
} from "./index.styled";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getPrivateSurvey } from "../../services/survey";
import { createAnswer } from "../../services/answer";
import Spinner from "../../components/spinner";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function SubmitSurvey() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [surveyData, setSurveyData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const { mutate: getSurveyInfo, isLoading: gettingSurveyInformations } =
    useMutation(() => getPrivateSurvey(id), {
      onSuccess: (res) => {
        setMessage("");
        setSurveyData(res);
        setAnswers(
          res?.question?.map((question) => {
            const key = question?.title;
            return [key, ""];
          })
        );
      },
      onError: (error) => {
        setAnswers([]);
        throw new Error(error);
      },
    });

  const { mutate: submitSurvey, isLoading: submitingSurvey } = useMutation(
    (values) => createAnswer(values, id),
    {
      onSuccess: (res) => {
        setAnswers([]);
        setShowErrorNotification(false);
        setShowSuccessNotification(true);
      },
      onError: (error) => {
        setShowSuccessNotification(false);
        setShowErrorNotification(true);
      },
    }
  );

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
  };

  const handleCloseErrorNotification = () => {
    setShowErrorNotification(false);
  };

  useEffect(() => {
    getSurveyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSuccessNotification]);
  return (
    <Container>
      {gettingSurveyInformations && <Spinner message="Učitavanje ankete..." />}
      {submitingSurvey && <Spinner message="Slanje odgovora..." />}
      <CardWrapper
        style={{
          display:
            gettingSurveyInformations || submitingSurvey ? "none" : "block",
        }}
      >
        {!showSuccessNotification && (
          <>
            <Header>
              <SurveyTitle>{surveyData?.title}</SurveyTitle>
              <SurveyDescription>{surveyData?.description}</SurveyDescription>
              <InfoWrapper>
                <SurveyMessage>Popunite anketu</SurveyMessage>
                <AuthorOfSurvey>Autor: {surveyData?.author}</AuthorOfSurvey>
              </InfoWrapper>
            </Header>
            {surveyData?.question &&
              surveyData?.question.length > 0 &&
              surveyData?.question.map((question, mainIndex) => {
                return (
                  <QuestionDiv key={mainIndex}>
                    <SurveyQuestion>{question?.title}</SurveyQuestion>
                    {question?.options.map((option, index) => {
                      const selectedAnswer = answers[mainIndex][1];
                      return (
                        <AnswerDiv key={index}>
                          <AnswerBtn
                            onClick={() => {
                              const newAnswers = [...answers];
                              newAnswers[mainIndex][1] = option;
                              setAnswers(newAnswers);
                            }}
                            style={{
                              backgroundColor:
                                selectedAnswer === option
                                  ? "#F6F4EB"
                                  : "#339af0",
                              color:
                                selectedAnswer === option
                                  ? "#1864ab"
                                  : "#ffffff",
                            }}
                          >
                            {option}
                          </AnswerBtn>
                        </AnswerDiv>
                      );
                    })}
                    {question?.optional && (
                      <AnswerInput
                        placeholder="Unesite željeni odgovor"
                        onChange={(e) => {
                          if (e.target.value.length > 0) {
                            const newAnswers = [...answers];
                            newAnswers[mainIndex][1] = e.target.value;
                            setAnswers(newAnswers);
                          }
                        }}
                      />
                    )}
                  </QuestionDiv>
                );
              })}
            {message && <SurveyErrorMessage>{message}</SurveyErrorMessage>}
            <SubmitSurveyWrapper>
              <Button
                type="submit"
                disabled={false}
                onClick={() => {
                  const isEveryAnswered = answers.every((answer) => {
                    return answer[1] !== "";
                  });
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
                  if (isEveryAnswered) {
                    setMessage("");
                    submitSurvey({ answers: answers, date: stringDate });
                  } else {
                    setMessage("Molimo Vas da odgovorite na sva pitanja!");
                  }
                }}
              >
                Potvrdi anketu
              </Button>
            </SubmitSurveyWrapper>
          </>
        )}
        {!!showSuccessNotification && (
          <Notification
            icon={<IconCheck size="1.1rem" />}
            color="teal"
            title="Uspešno ste popunili anketu!"
            onClose={handleCloseSuccessNotification}
          >
            Uspešno ste popunili anketu.
          </Notification>
        )}
        {!!showErrorNotification && (
          <Notification
            icon={<IconX size="1.1rem" />}
            color="red"
            title="Greška prilikom slanja odgovora ankete!"
            onClose={handleCloseErrorNotification}
          >
            Došlo je do greške prilikom slanja odgovora ankete. Molimo vas
            pokušajte ponovo.
          </Notification>
        )}
      </CardWrapper>
    </Container>
  );
}
