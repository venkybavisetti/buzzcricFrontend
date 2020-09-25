import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Menubar from '../Menubar';
import { buzzcricApi } from '../../api/buzzcricApi';
import UpdateScoreContext from '../../context/UpdateScoreContext';
import ScoreBoard from './ScoreBoard';
import InPlayPlayers from './InPlayPlayers';
import ThisOver from './ThisOver';
import UpdatingBox from './UpdatingBox';
import { useGetUser } from '../getUser';

const Header = () => {
  const { hostingTeam, visitorTeam } = useContext(
    UpdateScoreContext
  ).scoreCard.teams;
  return (
    <h1 className="scoreBoardHeader">
      {hostingTeam} <span className="vs">VS</span> {visitorTeam}
    </h1>
  );
};

const UpdateScore = (props) => {
  const { id } = useParams();
  const [scoreCard, setScoreCard] = useState(null);
  const user = useGetUser();

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
  if (scoreCard.winner) return <Redirect to={`/scoreBoard/${id}`} />;

  return (
    <div className="updatedScoreBoard">
      <Menubar imgUrl={user.img} />
      <UpdateScoreContext.Provider
        value={{ scoreCard, id, updateInPP, updateScores }}
      >
        <div>
          <Header />
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
