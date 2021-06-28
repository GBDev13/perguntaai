import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  width: 100%;
  background: ${props => props.theme.colors.gray100};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1.5rem;
  }

  & + & {
    margin-top: 1rem;
  }

  @media(max-width: 600px) {
    padding: 1rem;

    h2 {
      font-size: 1rem;
    }
  }
`;
