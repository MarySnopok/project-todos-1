import styled from "styled-components";

export const SelectionBtn = styled.button`
  background-color: transparent;
  border: 2px solid grey;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  font-size: 14px;
  padding: 10px;
  border-radius: 30px;
  color: grey;
  font-weight: bolder;
  transition: 0.1s ease-in;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  margin-top: 6px;

  &:hover {
    border: 2px solid #b8305c
    color: #b8305c;
  }

  @media (min-width: 768px) {
    margin-top: 20px;
    font-size: 16px;
    padding: 16px;
  }
`;
