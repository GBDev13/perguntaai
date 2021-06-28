import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.whiteText};
  transition: 0.5s;
  &:hover {
    background: ${props => lighten(0.1, props.theme.colors.primary)};
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
    @media (max-width: 500px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;
