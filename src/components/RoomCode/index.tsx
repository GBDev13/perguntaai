import { toast } from 'react-toastify';
import copyImg from '../../assets/images/copy.svg';
import { RoomCodeContainer } from './styles';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
    toast.success('O código da sala foi copiado para sua área de transferência!')
  }

  return (
    <RoomCodeContainer
      type="button"
      className="room-code"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala #{code}</span>
    </RoomCodeContainer>
  );
}
