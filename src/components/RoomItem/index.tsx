import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { database } from '../../services/firebase';
import { Button } from '../Button';

import { Container } from './styles';

type RoomType = {
  id: string;
  title: string;
  endedAt: string | null;
};

interface RoomItemProps {
  room: RoomType;
}

function RoomItem({ room }: RoomItemProps) {
  const history = useHistory();

  async function handleJoinRoom() {
    if (room?.endedAt) {
      toast.error('Falha ao entrar nesta sala. A sala já foi encerrada!')
      return;
    }

    history.push(`/admin/rooms/${room.id}`);
    toast.success('Você entrou na sala!')
  }

  return (
    <Container
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: .5 }}
    >
      <h2>{room.title}</h2>
      <Button onClick={handleJoinRoom} disabled={!!room.endedAt}>Entrar na sala</Button>
    </Container>
  );
};

export default RoomItem;
