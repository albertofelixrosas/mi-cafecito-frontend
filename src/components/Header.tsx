import React from 'react';
import { MdMenu, MdNotifications, MdAccountCircle } from 'react-icons/md';
import '../styles/header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={onMenuClick}>
          <MdMenu />
        </button>
        <h1 className="header__title">Dashboard</h1>
      </div>

      <div className="header__right">
        <button className="header__icon-btn">
          <MdNotifications />
        </button>
        <button className="header__icon-btn">
          <MdAccountCircle />
        </button>
      </div>
    </header>
  );
};

export default Header;
