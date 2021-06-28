import { darken } from 'polished';
import styled from 'styled-components';

export const ButtonContainer = styled.button`
    height: 50px;
    border-radius: .5rem;
    font-weight: 500;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.whiteText};
    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border: 0;

    transition: 0.5s;

    img {
      margin-right: 8px;
    }

    &.outlined {
      background: transparent;
      border: 1px solid ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.primary};
      height: 40px;

      &:not(:disabled):hover {
        background: transparent;
        border-color: ${props => darken(0.20, props.theme.colors.primary)};
      }
    }

    &:not(:disabled):hover {
      background: ${props => darken(0.20, props.theme.colors.primary)};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media(max-width: 600px) {
      height: 40px;
      font-size: .8rem;
      padding: 0 1rem;
    }
`;