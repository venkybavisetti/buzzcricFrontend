import { useState, useEffect, useContext } from 'react';

import UserContext from '../context/UserContext';
import { buzzcricApi } from '../api/buzzcricApi';

const useGetUser = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    buzzcricApi({ type: 'getUser' }).then((user) => {
      setUser(user);
    });
  }, [setUser]);

  return user;
};

const useTimer = ({ type, id }, timeToFetch = 10) => {
  const [match, setMatch] = useState(null);
  useEffect(() => {
    buzzcricApi({ type, id }).then(setMatch);
    const interval = setInterval(
      () => buzzcricApi({ type, id }).then(setMatch),
      1000 * timeToFetch
    );
    return () => {
      clearInterval(interval);
    };
  }, [timeToFetch, type, id]);

  return match;
};

export { useGetUser, useTimer };
