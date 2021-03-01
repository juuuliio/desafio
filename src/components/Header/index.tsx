import React from 'react';

import { FiPlusSquare } from 'react-icons/fi';
import { Container } from './styles';

interface IHeaderProps {
  openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <header>
      <nav>
        <button type="button" onClick={openModal}>
          <div className="text">Nova Sala</div>
          <div className="icon">
            <FiPlusSquare size={24} />
          </div>
        </button>
      </nav>
    </header>
  </Container>
);

export default Header;
