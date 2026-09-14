import styled from "styled-components";
import { SharedFooterAndHeaderStyles } from "./SharedFooterAndHeaderStyles";

export const Header = styled.header`
  ${SharedFooterAndHeaderStyles}
  align-self: flex-end;
  background-color: color-mix(in srgb, var(--background-color) 30%, transparent);
  backdrop-filter: blur(5px);
  justify-content: flex-end;
  align-items: center;
  @media (min-width: 768px) {
    min-height: 140px;
  }
`;
