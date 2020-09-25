import React from 'react';

const WinningStatus = ({ winner, className }) => (
  <div className={className}>{winner} won the match</div>
);

const TossWonBy = ({ tossWon, opted, className }) => {
  return (
    <div className={className}>
      toss won by {tossWon} {opted} first
    </div>
  );
};

const TargetToReach = ({ balls, target, overs, score, className }) => {
  return (
    <div className={className}>
      target {target - score} from {overs * 6 - balls}
    </div>
  );
};

const MatchStatusMsg = (props) => {
  if (props.winner)
    return (
      <WinningStatus
        {...{ winner: props.winner, className: props.className }}
      />
    );
  return props.inning === '1st' ? (
    <TossWonBy {...props} />
  ) : (
    <TargetToReach {...props} />
  );
};

const MatchStatus = ({ winner }) => {
  return winner ? (
    <div className="completed">completed</div>
  ) : (
    <div className="live">
      <div className="circle"> </div>Live
    </div>
  );
};

export { MatchStatus, MatchStatusMsg };
