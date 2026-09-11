import styled from "styled-components";

export const TodoInput = styled.input`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  font-family: "Nunito", sans-serif;
  outline: none;
  border: transparent;
  text-decoration: none;
  border-radius: 30px;
  color: var(--theme-color);
  font-size: 16px;
  padding: 4px;
  margin-left: 10px;
  background-color: transparent;

  @media (min-width: 768px) {
    width: 418px;
    height: 40px;
    font-size: 18px;
  }
`;
