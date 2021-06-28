import { StyledModal, ModalContent } from './styles';
import {ReactComponent as Delete} from '../../assets/images/delete.svg';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  handleDelete: () => void;
  handleClose: () => void;
}

function Modal({ isOpen, handleClose, handleDelete }: ModalProps) {

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={handleClose}
      onEscapeKeydown={handleClose}
    >
      <ModalContent>
        <div>
          <Delete />
          <h2>Excluir pergunta</h2>
          <p>Tem certeza que você deseja excluir esta pergunta?</p>

          <div>
            <button onClick={handleClose}>Cancelar</button>
            <button className="red" onClick={handleDelete}>Sim, excluir</button>
          </div>
        </div>
      </ModalContent>
    </StyledModal>
  );
};

export default Modal;
