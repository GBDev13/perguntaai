import styled from 'styled-components';

export const RoomCodeContainer = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: ${props => props.theme.colors.lightBackground100};
  color: ${props => props.theme.colors.whiteText};
  border: 1px solid ${props => props.theme.colors.primary};
  cursor: pointer;

  display: flex;

  div {
    background: ${props => props.theme.colors.primary};
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 1rem 0 0.75rem;
    font-size: .8rem;
    font-weight: 500;
    color: ${props => props.theme.colors.gray900};
  }

  @media(max-width: 600px) {
    div {
      padding: 0 .5rem;
    }

    span {
      padding: 0 .5rem 0 .5rem;
      font-size: .7rem;
    }
  }
`;