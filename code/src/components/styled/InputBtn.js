import styled from "styled-components";

export const InputBtn = styled.button`
  border-radius: 2px;
  border: none;
  background-color: transparent;
  border-left: 2px solid #b8305c;
  color: #b8305c;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;
