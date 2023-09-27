import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  padding-right: 50px;
  border-radius: 10px;
  box-shadow: 0 0 2px #339af0;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-out;
  position: relative;

  &:hover {
    background-color: #ebf5ff;
    transform: scale(1.03);
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 10px;
`;

export const Author = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0 0 5px;
`;

export const CreatedAt = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
`;

export const IconUpdate = styled.button`
  color: #1864ab;
  padding: 3px;
  background-color: #c5dff8;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 20px;
  &:hover {
    color: #f79800;
  }
`;

export const IconDelete = styled.button`
  color: #1864ab;
  padding: 3px;
  background-color: #ffdede;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  right: 15px;
  bottom: 20px;
  &:hover {
    color: #eb4747;
  }
`;
