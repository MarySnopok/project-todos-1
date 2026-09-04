import styled from "styled-components";

export const BackgroundSelection = styled.div`
  max-width: 220px;
  display: flex;
  flex-direction: row;
  border: none;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  background-size: contain;
  background-repeat: no-repeat;

  @media (min-width: 768px) {
    max-width: 700px;

    font-size: 18px;
  }
`;
