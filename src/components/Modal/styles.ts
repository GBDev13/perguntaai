import { darken } from "polished";
import styled from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.lightBackground100};
  transition : all 0.3s ease-in-out;
  border-radius: 1rem;
`;

export const ModalContent = styled.div`
  width: 100%;
  padding: 4rem 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  svg {
    width: 3rem;
    height: 3rem;

    & path {
      transition: .5s;
      stroke: ${props => props.theme.colors.red};
    }
  }

  h2 {
    font-family: 'Poppins', sans-serif;
    margin: 1rem 0;
  }

  p {
    margin-bottom: 2rem;
  }

  > div {
    button {
      background: ${props => props.theme.colors.answered};
      color: ${props => props.theme.colors.gray300};
      font-size: 1rem;
      padding: 1rem 2rem;
      border: none;
      border-radius: .5rem;
      font-weight: 500;
      cursor: pointer;
      transition: .5s;

      &:hover {
        background: ${props => darken(0.05, props.theme.colors.answered)};
      }

      & + button {
        margin-left: .5rem;
      }

      &.red {
        background: ${props => props.theme.colors.red};
        color: ${props => props.theme.colors.whiteText};

        &:hover {
          background: ${props => darken(0.05, props.theme.colors.red)};
        }
      }
    }
  }

  @media(max-width: 650px) {
    padding: 1rem;

    svg {
      width: 2rem;
      height: 2rem;
    }

    h2 {
      font-size: .9rem;
    }

    p {
      font-size: .7rem;
    }

    > div {
      button {
        font-size: .8rem;
        padding: 1rem;
      }
    }
  }
`;
