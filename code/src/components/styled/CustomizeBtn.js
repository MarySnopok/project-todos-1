import React from "react";
import styled from "styled-components";
import { ReactComponent as BrushIcon } from "../../assets/brush.svg";

const StyledCustomizeBtn = styled.button`
  width: 26px;
  height: 26px;
  border: none;
  background-color: transparent;
  color: var(--theme-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: 15px;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
    margin-right: 42px;
  }
  @media (min-width: 1200px) {
    width: 46px;
    height: 46px;
    margin-right: 52px;
  }
`;

export const CustomizeBtn = (props) => (
  <StyledCustomizeBtn type="button" {...props}>
    <BrushIcon aria-hidden="true" />
  </StyledCustomizeBtn>
);
