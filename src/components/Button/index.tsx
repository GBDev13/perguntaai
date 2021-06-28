import { ButtonHTMLAttributes } from 'react';

import { ButtonContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined, ...rest }: ButtonProps) {
  return (
    <ButtonContainer
      type="button"
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...rest}
    />
  );
}
