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
      <div className="teamHd">
        <div className="placement">
          {team}, {inning} inning
        </div>
        <div className="placement">CRR</div>
      </div>
      <div className="teamScore">
        <div className="placement">
          <span>
            {score}-{wickets}
          </span>
          ({Math.floor(balls / 6)}.{balls % 6})
        </div>
        <div className="placement crr">
          {((score / balls || 0) * 6).toFixed(2)}
        </div>
      </div>
      <div className="matchStatus">
        {inning === '1st' ? <TossWonBy /> : <TargetToReach />}
      </div>
    </div>
  );
};
