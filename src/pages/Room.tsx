import { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import logoImgLight from '../assets/images/logoLight.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import ThemeToggle from '../components/ThemeToggler';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';
import emptyImg from '../assets/images/emptyState.svg';

import { RoomContainer, EmptyContainer } from '../styles/RoomStyles';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

type RoomParams = {
  id: string;
}

export function Room() {
  const { id: roomId } = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const { user, signInWithGoogle } = useAuth();
  
  const { title, questions, loading, isEnded } = useRoom(roomId);

  const history = useHistory();

  useEffect(() => {
    if(!loading && isEnded) {
      history.push("/");
      toast.error("A sala que você estava foi encerrada!")
    }
  }, [history, isEnded, loading])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if(!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`/rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }
  }

  const { currentTheme } = useTheme();

  function handleGoToHome() {
    if(window.confirm("Tem certeza que deseja voltar a home?")) {
      history.push("/");
    }
  }

  const formattedQuestions = questions
  .sort((a, b) => b.likeCount - a.likeCount)
  .sort((a, b) => (a.isHighlighted === b.isHighlighted)? 0 : a.isHighlighted? -1 : 1)
  .sort((a, b) => (a.isAnswered === b.isAnswered)? 0 : a.isAnswered? 1 : -1);

  async function handleLogin() {
    await signInWithGoogle();
  }

  return (
    <RoomContainer>
      <header>
        <div className="content">
          {currentTheme === 'dark' ? <img src={logoImgLight} alt="Letmeask" onClick={handleGoToHome}/> : <img src={logoImg} alt="Letmeask" onClick={handleGoToHome}/>}
          <div className="buttonsContainer">
            <RoomCode code={roomId} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="content">
        { loading ? (
          <Spinner />
        ) : (
          <>
            <div className="room-title">
              <h1>Sala {title}</h1>
              { questions.length > 0 && <span>{questions.length} {questions.length <= 1 ? 'pergunta' : 'perguntas'}</span> }
            </div>

            <form onSubmit={handleSendQuestion}>
              <textarea
                placeholder="O que você quer perguntar?"
                onChange={({ target }) => setNewQuestion(target.value)}
                value={newQuestion}
              />

              <div className="form-footer">
                {user?.id ? (
                  <div className="user-info">
                    <img src={user.avatar} alt={user.name} />
                    <span>{user.name}</span>
                  </div>
                ) : <span>Para enviar uma pergunta, <button onClick={handleLogin}>faça seu login</button>.</span>}
                <Button type="submit" disabled={!user}>Enviar pergunta</Button>
              </div>
            </form>

            <div className="question-list">
              {formattedQuestions.map(question => (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <button
                    className={`like-button ${question.likeId ? 'liked' : ''}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                  >
                    { question.likeCount > 0 && <span>{question.likeCount}</span> }
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  )}
                </Question>
              ))}

              {questions.length <= 0 && (
                <EmptyContainer>
                  <img src={emptyImg} alt="Ilustração sem perguntas" />
                  <div>
                    <h2>Nenhuma pergunta por aqui...</h2>
                    <p>Faça sua primeira pergunta e envie o código dessa sala para outras pessoas!</p>
                  </div>
                </EmptyContainer>
              )}
            </div>
          </>
        )}
        
      </main>
    </RoomContainer>
  )
}