import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-family: "Nunito", sans-serif;

  &:hover {
    animation: ${rotate} 2s linear infinite;
    border: none;
  }

  @media (min-width: 768px) {
    padding: 16px;
  }
`;
