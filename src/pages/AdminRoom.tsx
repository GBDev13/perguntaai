import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import logoImgLight from '../assets/images/logoLight.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import emptyImg from '../assets/images/emptyState.svg';

import {ReactComponent as Check} from '../assets/images/check.svg';
import {ReactComponent as Answer} from '../assets/images/answer.svg';
import {ReactComponent as Delete} from '../assets/images/delete.svg';

import { database } from '../services/firebase';
import { RoomContainer, EmptyContainer } from '../styles/RoomStyles';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggler';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { id: roomId } = useParams<RoomParams>();
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const history = useHistory();

  const { title, questions, owner, loading, isEnded } = useRoom(roomId);
  const { user, userLoading } = useAuth();

  useEffect(() => {
    if(!userLoading && !loading) {
      if (!user || user.id !== owner) {
        history.push(`/rooms/${roomId}`);
        toast.error("Ei, você não é administrador desta sala!")
      }
    }
  }, [history, loading, owner, roomId, user, userLoading])

  useEffect(() => {
    if(!loading && isEnded) {
      history.push("/");
      toast.error("A sala que você estava foi encerrada!")
    }
  }, [history, isEnded, loading])

  async function handleEndRoom() {
    try {
      database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
  
      history.push('/');
      toast.success('Você encerrou a sala com sucesso!')
    } catch {
      toast.error("Ocorreu um erro ao encerrar esta sala.")
    }
  }

  function handleCloseModal(){
    setIsOpen(false);
    setCurrentId(null);
  }

  async function handleOpenModal(questionId: string) {
    setIsOpen(true);
    setCurrentId(questionId);
  }

  async function handleDelete(){
    setIsOpen(false);
    try {
      await database.ref(`rooms/${roomId}/questions/${currentId}`).remove();
      toast.success('A pergunta foi removida com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao remover esta pergunta.');
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
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

  return (
    <RoomContainer>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleDelete} handleClose={handleCloseModal}/>
      <header>
        <div className="content">
          {currentTheme === 'dark' ? <img src={logoImgLight} alt="Letmeask" onClick={handleGoToHome}/> : <img src={logoImg} alt="Letmeask" onClick={handleGoToHome}/>}
          <div className="buttonsContainer admin">
            <RoomCode code={roomId} />
            <div>
              <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="content">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="room-title">
              <h1>
                Sala
                {' '}
                {title}
              </h1>
              { questions.length > 0 && (
              <span>
                {questions.length}
                {' '}
                {questions.length <= 1 ? 'pergunta' : 'perguntas'}
              </span>
              ) }
            </div>

            <div className="question-list">
              {formattedQuestions.map((question) => (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                      >
                        <Check />
                      </button>
                      {!question.isHighlighted && (
                        <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                        >
                          <Answer />
                        </button>
                      )}
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleOpenModal(question.id)}
                  >
                    <Delete />
                  </button>
                </Question>
              ))}

              {questions.length <= 0 && (
                <EmptyContainer>
                  <img src={emptyImg} alt="Ilustração sem perguntas" />
                  <div>
                    <h2>Nenhuma pergunta por aqui...</h2>
                    <p>Aguarde a primeira pergunta ou envie o código dessa sala para outras pessoas!</p>
                  </div>
                </EmptyContainer>
              )}
            </div>
          </>
        )}
        
      </main>
    </RoomContainer>
  );
}
