import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Author,
  CreatedAt,
  IconDelete,
  IconUpdate,
} from "./index.styled";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function Card({
  id,
  title,
  author,
  createdAt,
  editSurvey,
  deleteSurvey,
  showButtons,
}) {
  const naviagate = useNavigate();

  const handleSurveyClick = () => {
    naviagate(`/survey/${id}`);
  };

  const handleEditSurveyClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the Container element
    editSurvey();
  };

  const handleDeleteSurveyClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the Container element
    deleteSurvey();
  };

  return (
    <Container onClick={handleSurveyClick}>
      <Title>{title}</Title>
      <Author>Autor: {author}</Author>
      <CreatedAt>Kreirana: {createdAt}</CreatedAt>
      {showButtons && (
        <>
          <IconUpdate onClick={handleEditSurveyClick}>
            <IconPencil />
          </IconUpdate>
          <IconDelete onClick={handleDeleteSurveyClick}>
            <IconTrash />
          </IconDelete>
        </>
      )}
    </Container>
  );
}
