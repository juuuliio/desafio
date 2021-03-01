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
  students: Array<IStudents>[];
}
interface ICreateRoomData {
  name: string;
  capacity: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddRoom: (room: Omit<IRoomPlate, 'id' | 'students'>) => void;
}

const ModalAddRoom: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddRoom,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateRoomData) => {
      handleAddRoom(data);

      setIsOpen();
    },
    [handleAddRoom, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Sala</h1>
        <Input name="name" placeholder="Nome da sala" />
        <Input name="capacity" placeholder="Capacidade máxima" />

        <button type="submit">
          <p className="text">Adicionar Sala</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddRoom;
