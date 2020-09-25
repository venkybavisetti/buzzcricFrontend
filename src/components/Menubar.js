import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

const LoginBtn = () => {
  return (
    <a href="http://localhost:8000/api/authenticate" className="login">
      Login
    </a>
  );
};

const Buttons = ({ onHome, imgUrl }) => {
  if (!imgUrl) return <LoginBtn />;
  return (
    <div className="menuBtnS">
      <img src={imgUrl} alt="img" className="imgUrl" />
      {onHome && (
        <Link className="hostBtn" to="/setupMatch">
          Host Match
        </Link>
      )}
    </div>
  );
};

const Menubar = ({ onHome, imgUrl }) => {
  return (
    <div>
      <div className="menubar">
        <Link to="/">
          <img src={Logo} alt="Went wrong..." className="logo" />
        </Link>
        <Buttons {...{ onHome, imgUrl }} />
      </div>

      <div className="separationBwtMenuBody"></div>
    </div>
  );
};

export default Menubar;
