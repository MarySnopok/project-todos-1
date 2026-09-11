import styled from "styled-components";

export const BackgroundSelection = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  border: none;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 15px;

  @media (min-width: 768px) {
    max-width: 720px;
    gap: 10px;

    font-size: 18px;
  }
`;
