import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IStudents {
  id: number;
  firstName: string;
  lastName: string;
}

interface IRoomPlate {
  id: number;
  name: string;
  capacity: number;
  students: Array<IStudents>;
}

interface IEditRoomData {
  name: string;
  capacity: number;
  students: Array<IStudents>;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateRoom: (food: Omit<IRoomPlate, 'id'>) => void;
  editingRoom: IRoomPlate;
}

const ModalEditFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateRoom,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditRoomData) => {
      handleUpdateRoom(data);

      setIsOpen();
    },
    [handleUpdateRoom, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Editar Sala</h1>
        <Input name="name" placeholder="Nome da sala" />
        <Input name="capacity" placeholder="Capacidade total" />

        <button type="submit">
          <p className="text">Salvar Edição</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
