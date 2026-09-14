import React from "react";
import styled from "styled-components";
import { ReactComponent as BrushIcon } from "../../assets/brush.svg";

const StyledCustomizeBtn = styled.button`
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  border: 2px solid var(--sub-theme-color);
  border-radius: 50%;
  background-color: var(--background-color);
  color: var(--theme-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: 30px;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover,
  &[aria-expanded="true"] {
    border-color: var(--theme-color);
  }

  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
    padding: 7px;
    margin-right: 42px;
  }
  @media (min-width: 1200px) {
    width: 46px;
    height: 46px;
    padding: 9px;
    margin-right: 52px;
  }
`;

export const CustomizeBtn = (props) => (
  <StyledCustomizeBtn type="button" {...props}>
    <BrushIcon aria-hidden="true" />
  </StyledCustomizeBtn>
);
