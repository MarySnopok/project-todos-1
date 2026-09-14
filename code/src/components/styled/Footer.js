import styled from "styled-components";
import { SharedFooterAndHeaderStyles } from "./SharedFooterAndHeaderStyles";

export const Footer = styled.footer`
  ${SharedFooterAndHeaderStyles}
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
`;
