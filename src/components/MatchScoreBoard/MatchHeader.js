import React, { useContext } from 'react';
import MatchStatus from './MatchStatus';
import ScoreBoardContext from '../../context/ScoreBoardContext';

const MatchHeaders = () => {
  const props = useContext(ScoreBoardContext);
  return (
    <div>
      <h1 className="scoreBoardHdr">
        {props.battingTeam.name} <span className="vs">VS</span>
        {props.bowlingTeam.name}
      </h1>
      <MatchStatus {...{ ...props, className: 'scoreBoardStatusMsg' }} />
    </div>
  );
};

export default MatchHeaders;
