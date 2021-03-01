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
  handleAddStudent: (room: Omit<IRoomPlate, 'id'>) => void;
  editingRoom: IRoomPlate;
}

const ModalAddStudent: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddStudent,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IEditRoomData) => {
      handleAddStudent(data);

      setIsOpen();
    },
    [handleAddStudent, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Estudante</h1>
        <Input name="firstName" placeholder="Nome do estudante" />
        <Input name="lastName" placeholder="Sobrenome do estudante" />

        <button type="submit">
          <p className="text">Adicionar Estudante</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddStudent;
