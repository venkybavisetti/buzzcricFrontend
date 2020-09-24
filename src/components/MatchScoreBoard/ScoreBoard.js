import React, { useState, useEffect, useContext } from 'react';
import ScoreBoardContext from '../../context/ScoreBoardContext';
import Menubar from '../Menubar';
import MatchHeaders from './MatchHeader';
import TeamScoreBoard from './TeamScoreBoard';
import { buzzcricApi } from '../../api/buzzcricApi';
import { useParams } from 'react-router-dom';

const MatchScoreBoard = ({ matchDetails }) => {
  const { battingTeam, bowlingTeam, inning, inPlay } = useContext(
    ScoreBoardContext
  );
  if (!matchDetails) return <p>loading....</p>;
  return (
    <div className="match_scoreBoard">
      <MatchHeaders />
      <TeamScoreBoard team={battingTeam} inPlay={inPlay} />
      {inning === '2nd' && <TeamScoreBoard team={bowlingTeam} />}
    </div>
  );
};

const useTimer = (timeToFetch = 10) => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  useEffect(() => {
    buzzcricApi({ type: 'scoreBoard', id }).then(setMatch);
    const interval = setInterval(
      () => buzzcricApi({ type: 'scoreBoard', id }).then(setMatch),
      1000 * timeToFetch
    );
    return () => {
      clearInterval(interval);
    };
  }, [id, timeToFetch]);

  return [match];
};

const ScoreBoard = (props) => {
  const [match] = useTimer(5);

  return (
    <div>
      <Menubar onHome={true} />
      <ScoreBoardContext.Provider value={{ ...match }}>
        <MatchScoreBoard matchDetails={match} />
      </ScoreBoardContext.Provider>
    </div>
  );
};

export default ScoreBoard;
