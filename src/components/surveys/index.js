import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { useMutation } from "react-query";
import Card from "../card";
import { deleteSurvey, getSurveys } from "../../services/survey";
import Spinner from "../spinner";
import {
  NoSurveyContainer,
  NoSurveyMessage,
  PaginationWrapper,
  SurveyPaginationWrapper,
  SurveyWrapper,
  EditSurveyText,
} from "./index.styled";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Pagination } from "@mantine/core";
import { Text, Notification, Modal } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import EditSurvey from "../editSurvey";

export default function Surveys() {
  const { token, surveys, setSurveys } = useContext(AppContext);
  const [newSurveys, setNewSurveys] = useState([]);
  const [activePage, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [openedModals, setOpenedModals] = useState([]);
  const { user } = useContext(AppContext);

  const perPage = 10;
  const visitedPerPage = (activePage - 1) * perPage;
  const totalPages = Math.ceil(surveys.length / perPage);

  const { mutate: getAllServeys, isLoading } = useMutation(() => getSurveys(), {
    onSuccess: (res) => {
      setSurveys(res);
      setNewSurveys(res);
    },
    onError: (error) => {
      setNewSurveys(surveys);
      throw new Error(error);
    },
  });

  const { mutate: deleteSpecialSurvey, isLoading: deletingSurvey } =
    useMutation((id) => deleteSurvey(token, id), {
      onSuccess: (res) => {
        setMessage("Anketa je uspešno obrisana.");
        setShowErrorNotification(false);
        setShowSuccessNotification(true);
        getAllServeys();
      },
      onError: (error) => {
        setMessage("Došlo je do greške prilikom brisanja ankete.");
        setShowSuccessNotification(false);
        setShowErrorNotification(true);
        throw new Error(error);
      },
    });

  const openModalForSurvey = (surveyId) => {
    setOpenedModals((prev) => [...prev, surveyId]);
  };

  const closeModalForSurvey = (surveyId) => {
    setOpenedModals((prev) => prev.filter((id) => id !== surveyId));
  };

  const isModalOpenForSurvey = (surveyId) => {
    return openedModals.includes(surveyId);
  };

  const openDeleteModal = (id) =>
    openConfirmModal({
      title: "Potvrda brisanja ankete",
      centered: true,
      children: (
        <Text size="sm">
          Da li ste sigurni da želite da obrišete ovu anketu? Brisanjem ankete
          se brišu i svi odgovori na nju. Nakon brisanja ankete, ne možete je
          vratiti.
        </Text>
      ),
      labels: { confirm: "Obriši", cancel: "Odustani" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteSpecialSurvey(id),
    });

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
  };

  const handleCloseErrorNotification = () => {
    setShowErrorNotification(false);
  };

  useEffect(() => {
    getAllServeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);
  return (
    <>
      {isLoading && <Spinner message="Učitavanje anketa..." />}
      {deletingSurvey && <Spinner message="Brisanje ankete..." />}
      {!!showSuccessNotification && !isLoading && !deletingSurvey && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title={message}
          onClose={handleCloseSuccessNotification}
        ></Notification>
      )}
      {!!showErrorNotification && !isLoading && !deletingSurvey && (
        <Notification
          icon={<IconX size="1.1rem" />}
          color="red"
          title={message}
          onClose={handleCloseErrorNotification}
        ></Notification>
      )}
      <SurveyPaginationWrapper>
        <SurveyWrapper
          style={{ display: isLoading || deletingSurvey ? "none" : "block" }}
        >
          {newSurveys && newSurveys.length > 0 ? (
            newSurveys
              .map((survey) => (
                <React.Fragment key={survey.id}>
                  <Card
                    id={survey.id}
                    title={survey.title}
                    author={survey.author}
                    createdAt={survey.created_at}
                    editSurvey={() => openModalForSurvey(survey.id)}
                    deleteSurvey={() => openDeleteModal(survey.id)}
                    showButtons={user.username === survey.author}
                  />
                  {isModalOpenForSurvey(survey.id) && (
                    <Modal
                      opened={true}
                      onClose={() => {
                        closeModalForSurvey(survey.id);
                        getAllServeys();
                      }}
                      fullScreen
                      transitionProps={{ transition: "fade", duration: 200 }}
                    >
                      <EditSurveyText>Ažuriranje ankete</EditSurveyText>
                      <EditSurvey
                        id={survey.id}
                        surveyTitle={survey.title}
                        surveyDescription={survey.description}
                        surveyAuthor={survey.author}
                        surveyCreatedAt={survey.created_at}
                        surveyQuestions={survey.question}
                      />
                    </Modal>
                  )}
                </React.Fragment>
              ))
              .slice(visitedPerPage, visitedPerPage + perPage)
          ) : (
            <NoSurveyContainer>
              <NoSurveyMessage>Nema dostupnih anketa.</NoSurveyMessage>
            </NoSurveyContainer>
          )}
        </SurveyWrapper>
        {newSurveys &&
          newSurveys.length > 0 &&
          !isLoading &&
          !deletingSurvey && (
            <PaginationWrapper>
              <Pagination
                total={totalPages}
                value={activePage}
                onChange={setPage}
              />
            </PaginationWrapper>
          )}
      </SurveyPaginationWrapper>
    </>
  );
}
