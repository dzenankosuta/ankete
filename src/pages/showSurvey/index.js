import React, { useEffect, useState } from "react";
import {
  AnswerInfo,
  AuthorOfSurvey,
  CardWrapper,
  Container,
  Header,
  InfoWrapper,
  ShareLinkMessage,
  SurveyDescription,
  SurveyTitle,
} from "./index.styled";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { excelSurvey, getSurvey } from "../../services/survey";
import Spinner from "../../components/spinner";
import CustomButton from "../../components/customButton";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IconCopy } from "@tabler/icons-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ShowSurvey() {
  const { id } = useParams();
  const currentURL = window.location.href;
  const newURL = currentURL.replace("survey", "submit-survey");
  const [isCopied, setIsCopied] = useState(false);
  const [surveyData, setSurveyData] = useState([]);
  const [answerData, setAnswerData] = useState([]);

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

  const { mutate: getSurveyInfo, isLoading: gettingSurveyInformations } =
    useMutation(() => getSurvey(localStorage.getItem("token"), id), {
      onSuccess: (res) => {
        setSurveyData(res);
        setAnswerData(res?.answers);
      },
      onError: (error) => {
        setSurveyData([]);
        setAnswerData([]);
        throw new Error(error);
      },
    });

  const { mutate: downloadSurveyInfo } = useMutation(
    () => excelSurvey(localStorage.getItem("token"), id),
    {
      onSuccess: (res) => {
        // console.log(res);
      },
      onError: (error) => {
        throw new Error(error);
      },
    }
  );

  useEffect(() => {
    getSurveyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      {gettingSurveyInformations && <Spinner message="Učitavanje ankete..." />}
      <CardWrapper
        style={{
          display: gettingSurveyInformations ? "none" : "block",
        }}
      >
        <Header>
          <SurveyTitle>{surveyData?.title}</SurveyTitle>
          <SurveyDescription>{surveyData?.description}</SurveyDescription>
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
          <InfoWrapper>
            {surveyData?.total_answers === 1 ? (
              <AnswerInfo>{surveyData?.total_answers} odgovor</AnswerInfo>
            ) : (
              <AnswerInfo>{surveyData?.total_answers} odgovora</AnswerInfo>
            )}
            {surveyData?.total_answers > 0 && (
              <CustomButton
                onClick={downloadSurveyInfo}
                text={"Preuzmi odgovore"}
                size={"medium"}
              />
            )}
          </InfoWrapper>
          <InfoWrapper>
            <AuthorOfSurvey>
              Anketa je kreirana: {surveyData?.created_at}
            </AuthorOfSurvey>
            <AuthorOfSurvey>Autor: {surveyData?.author}</AuthorOfSurvey>
          </InfoWrapper>
        </Header>
        {surveyData?.question &&
          surveyData?.question.length > 0 &&
          surveyData?.question.map((question, index) => {
            const options = {
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: question?.title,
                },
              },
            };
            const labels = question?.options.map((label) => label);
            if (question.optional) {
              labels.push("Ostalo");
            }
            const data = {
              labels,
              datasets: [
                {
                  label: "Odgovora",
                  data: labels.map((option) => {
                    if (question?.options.includes(option)) {
                      const answer = answerData.find(
                        (ans) => ans?.title === question?.title
                      );
                      return answer?.options[`${option}`]?.count;
                    } else {
                      let answers = [];
                      const correctQuestion = answerData.find(
                        (answer) => answer.title === question.title
                      );
                      for (let x of Object.keys(correctQuestion.options)) {
                        if (!question?.options.includes(x)) {
                          answers.push(x);
                        }
                      }
                      return answers.length;
                    }
                  }),
                  backgroundColor: "rgba(51, 154, 240, 0.5)",
                },
              ],
            };
            return <Bar options={options} data={data} key={index} />;
          })}
      </CardWrapper>
    </Container>
  );
}
