import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

const Menubar = ({ onHome }) => {
  return (
    <div>
      <div className="menubar">
        <Link to="/">
          <img src={Logo} alt="Went wrong..." className="logo" />
        </Link>

        {onHome && (
          <Link className="hostBtn" to="/setupMatch">
            Host Match
          </Link>
        )}
      </div>

      <div className="separationBwtMenuBody"></div>
    </div>
  );
};

export default Menubar;
