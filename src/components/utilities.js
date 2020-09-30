import { useState, useEffect } from 'react';

import { buzzcricApi } from '../api/buzzcricApi';

const useTimer = (action, timeToFetch = 10) => {
  const [match, setMatch] = useState(null);
  useEffect(() => {
    buzzcricApi(action).then(setMatch);
    const interval = setInterval(
      () => buzzcricApi(action).then(setMatch),
      1000 * timeToFetch
    );
    return () => {
      clearInterval(interval);
    };
  }, [timeToFetch]);

  return match;
};

export { useTimer };
