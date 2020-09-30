import React, { useContext } from 'react';
import ScoreBoardContext from '../../context/ScoreBoardContext';
import Menubar from '../Menubar';
import MatchHeaders from './MatchHeader';
import TeamScoreBoard from './TeamScoreBoard';
import { useParams } from 'react-router-dom';
import { useTimer } from '../utilities';

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

const ScoreBoard = (props) => {
  const { id } = useParams();
  const match = useTimer({ type: 'scoreBoard', id }, 5);
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
