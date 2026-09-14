import styled from "styled-components";
import { SharedFooterAndHeaderStyles } from "./SharedFooterAndHeaderStyles";

export const Header = styled.header`
  ${SharedFooterAndHeaderStyles}
  align-self: flex-end;
  background-color: transparent;
  justify-content: flex-end;
  align-items: center;
  @media (min-width: 768px) {
    min-height: 140px;
  }
`;
