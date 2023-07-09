import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  `

export default GlobalStyle;