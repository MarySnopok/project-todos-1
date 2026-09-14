import styled from "styled-components";

export const SelectionBtn = styled.button`
  background-color: var(--background-color);
  border: 2px solid var(--sub-theme-color);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  font-size: 14px;
  padding: 10px;
  border-radius: 30px;
  color: var(--sub-theme-color);
  font-weight: bolder;
  transition: 0.1s ease-in;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover,
  &[aria-current="true"] {
    border: 2px solid var(--theme-color);
    color: var(--theme-color);
    background-color: color-mix(in srgb, var(--theme-color) 18%, var(--background-color));
    backdrop-filter: blur(10px);
  }

  @media (min-width: 768px) {
    margin-top: 20px;
    font-size: 16px;
    padding: 16px;
  }
`;
