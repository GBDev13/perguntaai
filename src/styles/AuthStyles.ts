import { darken } from 'polished';
import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
  
  aside {
    flex: 7;

    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.whiteText};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 80px;

    img {
      max-width: 320px;
    }

    strong {
      font: 700 36px 'Poppins', sans-serif;
      line-height: 42px;
      margin-top: 16px;
    }

    p {
      font-size: 24px;
      line-height: 32px;
      margin-top: 16px;
      color: ${props => props.theme.colors.gray150};
    }
  }

  main {
    flex: 8;

    padding: 0 32px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    align-items: stretch;
    text-align: center;

    > img {
      align-self: center;
      max-width: 230px;
    }

    h2 {
      font-size: 24px;
      margin: 64px 0 24px;
      font-family: 'Poppins', sans-serif;
    }

    form {
      input {
        height: 50px;
        border-radius: 8px;
        padding: 0 16px;
        background: ${props => props.theme.colors.lightBackground100};
        border: 1px solid ${props => props.theme.colors.gray400};
      }

      button {
        margin-top: 16px;
      }

      button, input {
        width: 100%;
      }
    }

    p {
      font-size: 14px;
      color: ${props => props.theme.colors.gray300};
      margin-top: 16px;

      a {
        color: ${props => props.theme.colors.highlight};
      }
    }
  }

  .create-room {
    margin-top: 64px;
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background: ${props => props.theme.colors.google};
    color: ${props => props.theme.colors.whiteText};

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border: 0;

    transition: 0.5s;

    img {
      margin-right: 8px;
    }

    &:hover {
      background: ${props => darken(0.08, props.theme.colors.google)};
    }
  }

  .my-rooms {
    margin-top: 1rem;
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background: ${props => props.theme.colors.highlight};
    color: ${props => props.theme.colors.whiteText};

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border: 0;

    transition: 0.5s;

    svg {
      margin-right: .5rem;
    }

    &:hover {
      filter: brightness(0.9);
      background: ${props => darken(0.09, props.theme.colors.highlight)};
    }
  }

  .separator {
    font-size: 14px;
    color: ${props => props.theme.colors.gray400};

    margin: 32px 0;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      flex: 1;
      height: 1px;
      background: ${props => props.theme.colors.gray400};
      margin-right: 16px;
    }

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: ${props => props.theme.colors.gray400};
      margin-left: 16px;
    }
  }

  @media(max-width: 1000px) {
    flex-direction: column-reverse;
    display: grid;
    grid-template-rows: 2fr 1fr;

    aside {
      grid-row: 2;
      padding: 1rem;
      align-items: center;
      img {
        display: none;
      }

      strong {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      p {
        font-size: 1rem;
        line-height: 1rem;
      }
    }

    main {
      grid-row: 1;
      padding: 3rem 1rem;
    }
  }
`;