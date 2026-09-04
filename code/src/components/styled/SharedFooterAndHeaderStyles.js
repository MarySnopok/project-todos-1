import { css } from "styled-components";

export const SharedFooterAndHeaderStyles = css`
  width: ${(props) => props.width}%;
  min-height: ${(props) => props.height}px;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
  font-weight: 400;
  font-family: "Nunito", sans-serif;
  color: grey;
  box-sizing: border-box;
  @media (min-width: 768px) {
    width: 100%;
    font-size: 18px;
  }
`;
