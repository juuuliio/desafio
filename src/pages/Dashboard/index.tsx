import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Room from '../../components/Room';
import ModalAddRoom from '../../components/ModalAddRoom';
import ModalEditRoom from '../../components/ModalEditRoom';
import ModalAddStudent from '../../components/ModalAddStudent';

import { RoomsContainer } from './styles';

interface IStudents {
  id: number;
  firstName: string;
  lastName: string;
}

interface IStudentsPlate {
  firstName: string;
  lastName: string;
}

interface IRoomPlate {
  id: number;
  name: string;
  capacity: number;
  students: Array<IStudents>;
}

const Dashboard: React.FC = () => {
  const [rooms, setRooms] = useState<IRoomPlate[]>([]);
  const [editingRoom, setEditingRoom] = useState<IRoomPlate>({} as IRoomPlate);
  const [students, setStudents] = useState<IStudentsPlate>(
    {} as IStudentsPlate,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

  useEffect(() => {
    async function loadRooms(): Promise<void> {
      const response = await api.get('/rooms');

      setRooms(response.data);
    }

    loadRooms();
  }, []);

  async function handleAddRom(
    room: Omit<IRoomPlate, 'id' | 'students'>,
  ): Promise<void> {
    try {
      const response = await api.post('/rooms', { ...room, students: [] });

      setRooms([...rooms, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddStudents(
    room: Omit<IRoomPlate, 'id'>,
  ): Promise<void> {
    try {
      const response = await api.put(`/rooms/${editingRoom.id}`, {
        ...editingRoom,
        ...room,
      });
      setRooms(
        rooms.map(mappedRoom =>
          mappedRoom.id === editingRoom.id ? { ...response.data } : mappedRoom,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateRoom(room: Omit<IRoomPlate, 'id'>): Promise<void> {
    try {
      const response = await api.put(`/rooms/${editingRoom.id}`, {
        ...editingRoom,
        ...room,
      });

      setRooms(
        rooms.map(mappedRoom =>
          mappedRoom.id === editingRoom.id ? { ...response.data } : mappedRoom,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteRoom(id: number): Promise<void> {
    try {
      await api.delete(`/rooms/${id}`);

      setRooms(rooms.filter(room => room.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function toogleAddStudentsModal(): void {
    setAddStudentModalOpen(!addStudentModalOpen);
  }

  function handleEditRoom(room: IRoomPlate): void {
    setEditingRoom(room);
    toggleEditModal();
  }

  function handleAddStudent(room: IRoomPlate): void {
    setEditingRoom(room);
    toogleAddStudentsModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddRoom
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddRoom={handleAddRom}
      />

      <ModalAddStudent
        isOpen={addStudentModalOpen}
        editingRoom={editingRoom}
        setIsOpen={toogleAddStudentsModal}
        handleAddStudent={handleAddStudents}
      />

      <ModalEditRoom
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingRoom={editingRoom}
        handleUpdateRoom={handleUpdateRoom}
      />

      <RoomsContainer data-testid="rooms-list">
        {rooms &&
          rooms.map(room => (
            <Room
              key={room.id}
              room={room}
              handleDelete={handleDeleteRoom}
              handleEditRoom={handleEditRoom}
              handleAddStudent={handleAddStudent}
            />
          ))}
      </RoomsContainer>
    </>
  );
};

export default Dashboard;
