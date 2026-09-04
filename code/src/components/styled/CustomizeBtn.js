import styled from "styled-components";
import brush from "../../assets/brush.svg";

export const CustomizeBtn = styled.button`
  width: 28px;
  border: none;
  height: 28px;
  background: url("${brush}");
  object-fit: cover;
  background-color: transparent;
  margin-right: 15px;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
    margin-right: 52px;
  }
`;
