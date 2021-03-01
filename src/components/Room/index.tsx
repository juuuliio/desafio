import React from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

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

interface IProps {
  room: IRoomPlate;
  handleDelete: (id: number) => {};
  handleEditRoom: (room: IRoomPlate) => void;
  handleAddStudent: (room: IRoomPlate) => void;
}

const Room: React.FC<IProps> = ({
  room,
  handleDelete,
  handleEditRoom,
  handleAddStudent,
}: IProps) => {
  const isAvaliable = room.students.length < room.capacity;

  function setEditingRoom(): void {
    handleEditRoom(room);
  }

  function setAddStudent(): void {
    handleAddStudent(room);
  }

  return (
    <Container
      capacity={room.capacity}
      students={room.students.map(student => student)}
    >
      <header>
        <p className="capacity">
          <b>
            {room.students.length} / {room.capacity}
          </b>
        </p>
      </header>
      {isAvaliable && (
        <button type="button" className="icon" onClick={() => setAddStudent()}>
          Adicionar Estudante
        </button>
      )}
      <section className="body">
        <h3>{room.name}</h3>
        {room.students.map(student => (
          <li key={student.id}>
            {`${student.id} - Nome: ${student.firstName} ${student.lastName}`}
          </li>
        ))}
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingRoom()}
            data-testid={`edit-room-${room.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(room.id)}
            data-testid={`remove-room-${room.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvaliable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${room.id}`} className="switch">
            <input
              id={`available-switch-${room.id}`}
              type="checkbox"
              checked={isAvaliable}
              readOnly
              data-testid={`change-status-room-${room.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Room;
