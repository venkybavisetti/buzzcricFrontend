import React, { useContext } from 'react';
import UpdateScoreContext from '../../context/UpdateScoreContext';

export default () => {
  const { inPlay } = useContext(UpdateScoreContext);
  const { target, team, inning, score, wickets, overs } = inPlay.scoreBoard;
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
            ({Math.ceil(overs / 6)}.{overs % 6})
          </div>
        </div>
      </div>
      <div>
        <div>CR</div>
        <div>{((score / overs || 0) * 6).toFixed(2)}</div>
      </div>
    </div>
  );
};
