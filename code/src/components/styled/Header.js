import styled from "styled-components";
import { SharedFooterAndHeaderStyles } from "./SharedFooterAndHeaderStyles";

export const Header = styled.header`
  ${SharedFooterAndHeaderStyles}
  align-self: flex-end;
  background-color: rgba(216, 112, 147, 0.208);
  justify-content: flex-end;
  align-items: center;
  @media (min-width: 768px) {
    min-height: 140px;
  }
`;
