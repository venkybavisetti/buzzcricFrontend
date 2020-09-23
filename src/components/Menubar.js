import React from 'react';
import { Link } from 'react-router-dom';

const Menubar = ({ onHome }) => {
  return (
    <div>
      <div className="menubar">
        <Link to="/">
          <img
            src="https://www.cricbuzz.com/images/cbz-logo.png"
            alt="Went wrong..."
            className="logo"
          />
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
