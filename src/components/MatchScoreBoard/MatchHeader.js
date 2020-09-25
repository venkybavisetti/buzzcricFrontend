import React, { useContext } from 'react';
import ScoreBoardContext from '../../context/ScoreBoardContext';
import { MatchStatusMsg, MatchStatus } from './MatchStatus';

const MatchHeaders = () => {
  const props = useContext(ScoreBoardContext);
  return (
    <div className="matchHeader">
      <MatchStatus winner={props.winner} />

      <h1 className="scoreBoardHdr">
        {props.battingTeam.name} <span className="vs">VS</span>
        {props.bowlingTeam.name}
      </h1>
      <MatchStatusMsg {...{ ...props, className: 'scoreBoardStatusMsg' }} />
    </div>
  );
};

export default MatchHeaders;
