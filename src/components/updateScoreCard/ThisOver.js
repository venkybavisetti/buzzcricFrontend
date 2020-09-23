import React, { useContext } from 'react';
import UpdateScoreContext from '../../context/UpdateScoreContext';
import { getBallClass } from './utilities';

const ThisOver = () => {
  const { inPlay } = useContext(UpdateScoreContext);
  const balls = inPlay.currentOver.map((runs, index) => (
    <div className={getBallClass(runs)} key={index}>
      {runs}
    </div>
  ));
  return <div className="balls thisOver">{balls}</div>;
};

export default ThisOver;
