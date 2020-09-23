import React, { useContext } from 'react';
import UpdateScoreContext from '../../context/UpdateScoreContext';
import { getBallClass } from './utilities';

const ThisOver = () => {
  const { currentOver } = useContext(UpdateScoreContext).scoreCard;
  const balls = currentOver.map((runs, index) => (
    <div className={getBallClass(runs)} key={index}>
      {runs}
    </div>
  ));
  return <div className="balls thisOver">{balls}</div>;
};

export default ThisOver;
