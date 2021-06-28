import { ReactNode } from 'react';
import cx from 'classnames';
import { QuestionContainer } from './styles';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children
}: QuestionProps) {
  return (
    <QuestionContainer
    initial={{ scale: 0.5 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}
    transition={{ duration: .5 }}
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </QuestionContainer>
  );
}
