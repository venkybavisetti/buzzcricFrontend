import React, { useContext } from 'react';
import ScoreBoardContext from '../../context/ScoreBoardContext';
import { MatchStatusMsg, MatchStatus } from './MatchStatus';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';

const MatchHeaders = () => {
  const { user } = useContext(UserContext);
  const props = useContext(ScoreBoardContext);
  return (
    <div className="matchHeader">
      <div className="editScoreBoard">
        <MatchStatus winner={props.winner} />
        {props.userId === +user.id && !props.winner && (
          <Link
            className="hostBtn editOption"
            to={`/updateScoreCard/${props.matchId}`}
          >
            Edit
          </Link>
        )}
      </div>

      <h1 className="scoreBoardHdr">
        {props.battingTeam.name} <span className="vs">VS</span>
        {props.bowlingTeam.name}
      </h1>
      <MatchStatusMsg {...{ ...props, className: 'scoreBoardStatusMsg' }} />
    </div>
  );
};

export default MatchHeaders;
