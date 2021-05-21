import styled from "styled-components";


const ButtonWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  justify-self: flex-start;
  .handle:not(.react-draggable-dragging) {
    -webkit-transition: -webkit-transform 0.5s ease-out; /* Safari */
    transition: transform 0.5s ease-out;
  }
`;



export {
  ButtonWrapper
}