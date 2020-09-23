import React, { useContext } from 'react';
import UpdateScoreContext from '../../context/UpdateScoreContext';

export default () => {
  const { scoreCard } = useContext(UpdateScoreContext);
  const {
    team,
    inning,
    score,
    wickets,
    balls,
    target,
    tossWon,
  } = scoreCard.scoreBoard;
  return (
    <div className="scoreBoard">
      <div>
        <div>
          {team}, {inning} inning
        </div>
        <div className="teamScore">
          <div>
            {score}-{wickets}
          </div>
          <div>
            ({Math.floor(balls / 6)}.{balls % 6})
          </div>
        </div>
      </div>
      <div>
        <div>CR</div>
        <div>{((score / balls || 0) * 6).toFixed(2)}</div>
      </div>
    </div>
  );
};
