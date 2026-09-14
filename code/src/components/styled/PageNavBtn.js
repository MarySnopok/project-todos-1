import styled from "styled-components";
import { SelectionBtn } from "./SelectionBtn";

export const PageNavBtn = styled(SelectionBtn)`
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;

  @media (min-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;
