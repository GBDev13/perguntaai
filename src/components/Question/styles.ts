import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled from 'styled-components';

export const QuestionContainer = styled(motion.div)`
  background: ${props => props.theme.colors.gray100};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  padding: 24px;

  & + .question {
    margin-top: 1rem;
  }

  &.highlighted {
    background: ${props => props.theme.colors.highlighted};
    border: 1px solid ${props => props.theme.colors.primary};

    footer .user-info span {
      color: ${props => props.theme.colors.gray900};
    }
  }

  &.answered {
    background: ${props => props.theme.colors.answered};
  }

  p {
    color: ${props => props.theme.colors.gray900};
  }
  
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    
    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        color: ${props => props.theme.colors.gray300};
        font-weight: 500;
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: none;
      background: transparent;
      cursor: pointer;
      transition: .5s;

      svg path,
      svg circle {
        transition: .5s;
        stroke: ${props => props.theme.colors.icons}
      }

      &:hover {
        svg path,
        svg circle {
          stroke: ${props => props.theme.colors.primary}
        }
      }

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: ${props => props.theme.colors.gray300};
        gap: 8px;

        &.liked {
          color: ${props => props.theme.colors.primary};

          svg path {
            transition: .5s;
            stroke: ${props => props.theme.colors.primary};
          }
        }
      }

      &:hover {
        &.like-button {
          &.liked {
            color: ${props => darken(0.25, props.theme.colors.primary)};

            svg path {
              stroke: ${props => darken(0.25, props.theme.colors.primary)};
            }
          }
        }
      }
    }
  }

`;