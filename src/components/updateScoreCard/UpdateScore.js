import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menubar from '../Menubar';
import { buzzcricApi } from '../../api/buzzcricApi';
import UpdateScoreContext from '../../context/UpdateScoreContext';
import ScoreBoard from './ScoreBoard';
import InPlayPlayers from './InPlayPlayers';
import ThisOver from './ThisOver';
import UpdatingBox from './UpdatingBox';

const UpdateScore = (props) => {
  const { id } = useParams();
  const [scoreCard, setScoreCard] = useState(null);

  const updateInPP = (inPlay) => {
    buzzcricApi({ type: 'updateInPP', id, data: inPlay }).then(setScoreCard);
  };

  const updateScores = (ball) => {
    buzzcricApi({ type: 'updateScore', id, data: { ball } }).then(setScoreCard);
  };

  useEffect(() => {
    buzzcricApi({ type: 'getInPlay', id }).then(setScoreCard);
  }, [id]);

  if (scoreCard === null) return <p>Loading...</p>;
  return (
    <div>
      <Menubar />
      <UpdateScoreContext.Provider
        value={{ scoreCard, id, updateInPP, updateScores }}
      >
        <div>
          <ScoreBoard />
          <InPlayPlayers />
          <ThisOver />
          <UpdatingBox />
        </div>
      </UpdateScoreContext.Provider>
    </div>
  );
};

export default UpdateScore;
