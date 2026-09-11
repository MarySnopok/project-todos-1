import styled from "styled-components";
import brush from "../../assets/brush.svg";

export const CustomizeBtn = styled.button`
  width: 26px;
  border: none;
  height: 26px;
  background: url("${brush}");
  object-fit: cover;
  background-color: transparent;
  margin-right: 15px;

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
