import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">prodApp</h1>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Dashboard</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
