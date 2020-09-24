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

const MatchStatus = (props) => {
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

export default MatchStatus;
