import React, { useContext } from 'react';
import UpdateScoreContext from '../../context/UpdateScoreContext';

const TossWonBy = () => {
  const { tossWon, opted } = useContext(
    UpdateScoreContext
  ).scoreCard.scoreBoard;
  return (
    <div>
      toss won by {tossWon} {opted} first
    </div>
  );
};

const TargetToReach = () => {
  const { balls, target, overs, score } = useContext(
    UpdateScoreContext
  ).scoreCard.scoreBoard;
  return (
    <div>
      target {target - score} from {overs * 6 - balls}
    </div>
  );
};

export default () => {
  const { team, inning, score, wickets, balls } = useContext(
    UpdateScoreContext
  ).scoreCard.scoreBoard;
  return (
    <div className="scoreBoard">
      <div className="scoreInScoreBoard">
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
      <div className="matchStatus">
        {inning === '1st' ? <TossWonBy /> : <TargetToReach />}
      </div>
    </div>
  );
};
