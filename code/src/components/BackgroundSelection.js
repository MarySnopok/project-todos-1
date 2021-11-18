import styled from "styled-components";

export const BackgroundSelection = styled.div`
max-width: 220px;
display flex; 
flex-direction: row;
position: fixed: 
left:0;
right: calc(100vw-220px);
align-items: center;
justify-content: flex-start;
font-size: 16px;

@media (min-width: 769px) {
    max-width: 700px;
   left:0;
   right: calc(100vw-700px);
    font-size: 18px;
  }
`;