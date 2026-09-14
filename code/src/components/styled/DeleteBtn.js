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
  color: var(--sub-theme-color);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin-left: 15px;
  font-family: "Nunito", sans-serif;

  &:hover {
    animation: ${rotate} 2s linear infinite;
    border: none;
  }

  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
    padding: 2px;
    margin-left: 15px;
  }
`;
