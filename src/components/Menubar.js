import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../images/logo.png';
import { buzzcricApi } from '../api/buzzcricApi';
import UserContext from '../context/UserContext';

const LoginBtn = () => {
  return (
    <a href={process.env.REACT_APP_LOGIN_REDIRECT} className="login">
      Login
    </a>
  );
};

const Buttons = ({ onHome, user, setUser }) => {
  const history = useHistory();
  const logout = () => {
    buzzcricApi({ type: 'logout' })
      .then(() => {
        setUser({});
      })
      .catch((err) => history.push('/'));
  };

  if (!user.name) return <LoginBtn />;
  return (
    <div className="menuBtnS">
      <img src={user.img} alt="img" className="imgUrl" onClick={logout} />
      {onHome && (
        <Link className="hostBtn" to="/setupMatch">
          Host Match
        </Link>
      )}
    </div>
  );
};

const Menubar = ({ onHome }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <div className="menubar">
        <Link to="/">
          <img src={Logo} alt="Went wrong..." className="logo" />
        </Link>
        <Buttons {...{ onHome, user, setUser }} />
      </div>

      <div className="separationBwtMenuBody"></div>
    </div>
  );
};

export default Menubar;
