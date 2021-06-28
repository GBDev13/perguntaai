import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      transition:.3s;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.highlight};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-track{
      background: ${({ theme }) => theme.colors.gray900};
      border-radius: 10px;
    }

  }

  body {
    background: ${props => props.theme.colors.gray150};
    color: ${props => props.theme.colors.gray900};
    transition: all 0.30s linear;
  }

  body, input, button, textarea {
    font: 400 16px 'Roboto', sans-serif;
    color: ${props => props.theme.colors.gray900};

    &::placeholder {
      color: ${props => props.theme.colors.gray900};
    }
  }
`;