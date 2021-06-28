import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoImgLight from '../assets/images/logoLight.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';
import { AuthContainer } from '../styles/AuthStyles';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';

import { IoMdListBox } from 'react-icons/io';
import { VscSignOut } from 'react-icons/vsc';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle, signOut } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user?.id) {
      await signInWithGoogle()
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      toast.error('Falha ao entrar nesta sala. Código não encontrado!')
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Falha ao entrar nesta sala. A sala já foi encerrada!')
      return;
    }

    history.push(`/rooms/${roomCode}`);
    toast.success('Você entrou na sala!')
  }

  const { currentTheme } = useTheme();

  return (
    <AuthContainer>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          {currentTheme === 'dark' ? <img src={logoImgLight} alt="Letmeask" /> : <img src={logoImg} alt="Letmeask" />}
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          { user?.id && (
            <>
              <button className="my-rooms" onClick={() => history.push('/myrooms')}>
                <IoMdListBox />
                Minhas salas
              </button>
              <button className="my-rooms" onClick={signOut}>
                <VscSignOut />
                Sair da conta
              </button>
            </>
          )}
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={({ target }) => setRoomCode(target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </AuthContainer>
  )
}
