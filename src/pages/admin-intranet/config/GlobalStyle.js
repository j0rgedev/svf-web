import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  
  body{
    width:100%;
    height:100%;
  }

  h1{
    font-size: clamp(22px, 2.5vw, 28px); 
  }

  p{
    font-size: clamp(12px, 2.5vw, 20px); 
  }
`;

export default GlobalStyle;