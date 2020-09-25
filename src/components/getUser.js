import UserContext from '../context/UserContext';
import { useEffect, useContext } from 'react';
import { buzzcricApi } from '../api/buzzcricApi';

const useGetUser = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    buzzcricApi({ type: 'getUser' }).then(setUser);
  }, [setUser]);

  return user;
};

export { useGetUser };
