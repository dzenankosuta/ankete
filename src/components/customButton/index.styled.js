import styled from "styled-components";

export const StyledCustomButton = styled.button`
  width: ${(props) => {
    switch (props.size) {
      case "small":
        return "20%";
      case "medium":
        return "50%";
      case "large":
        return "100%";
      default:
        return "150px";
    }
  }};
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "5px 10px";
      case "medium":
        return "10px 20px";
      case "large":
        return "10px 30px";
      default:
        return "10px 20px";
    }
  }};
  border-radius: 5px;
  background-color: #339af0;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #1864ab;
  }

  @media screen and (max-width: 700px) {
    width: ${(props) => {
      switch (props.size) {
        case "small":
          return "20%";
        case "medium":
          return "50%";
        case "large":
          return "100%";
        default:
          return "150px";
      }
    }};
    padding: ${(props) => {
      switch (props.size) {
        case "small":
          return "5px 5px";
        case "medium":
          return "10px 10px";
        case "large":
          return "10px 15px";
        default:
          return "10px 10px";
      }
    }};
    font-size: 0.9rem;
  }
`;
