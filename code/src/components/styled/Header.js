import styled from "styled-components";
import { SharedFooterAndHeaderStyles } from "./SharedFooterAndHeaderStyles";

export const Header = styled.header`
  ${SharedFooterAndHeaderStyles}
  align-self: flex-end;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  justify-content: flex-end;
  align-items: center;
  @media (min-width: 768px) {
    min-height: 140px;
  }
`;
