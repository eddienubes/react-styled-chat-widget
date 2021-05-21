import styled from "styled-components";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: calc(16px + (25 - 16) * ((100vw - 300px) / (3800 - 300)));
    font-family: "Roboto", sans-serif;
  }
`;

const AppWrapper = styled.div`

`;

export {
  GlobalStyles,
  AppWrapper
}