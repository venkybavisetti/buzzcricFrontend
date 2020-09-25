import React, { useContext } from 'react';
import UpdateScoreContext from '../../context/UpdateScoreContext';

const PlayerDetails = ({ details, className }) => {
  return (
    <div className={`inPlayBatsmanHdr ${className}`}>
      <div className="pos1">{details[0]}</div>
      <div className="pos2">{details[1]}</div>
      <div className="pos3">{details[2]}</div>
      <div className="pos4">{details[3]}</div>
    </div>
  );
};

const Batsman = ({ batsman, isInStrick }) => {
  let batsmanName = batsman.name;
  if (isInStrick) batsmanName += ' *';

  return (
    <PlayerDetails
      details={[
        batsmanName,
        batsman.batting.score,
        batsman.batting.balls,
        ((batsman.batting.score / batsman.batting.balls || 0) * 100).toFixed(2),
      ]}
    />
  );
};

const InPlayBatsman = () => {
  const { batsman, opponentBatsman } = useContext(
    UpdateScoreContext
  ).scoreCard.inPlay;

  const strick = batsman && <Batsman batsman={batsman} isInStrick={true} />;
  const nonStrick = opponentBatsman && (
    <Batsman batsman={opponentBatsman} isInStrick={false} />
  );

  return (
    <div className="batsman">
      <PlayerDetails
        details={['Batsman', 'R', 'B', 'SR']}
        className="inPlayHdr"
      />
      {strick}
      {nonStrick}
    </div>
  );
};

const InPlayBowler = () => {
  const { bowler } = useContext(UpdateScoreContext).scoreCard.inPlay;
  return (
    <div>
      <PlayerDetails
        details={['Bowler', 'O', 'R', 'W']}
        className="inPlayHdr"
      />
      {bowler && (
        <PlayerDetails
          details={[
            bowler.name,
            `${Math.floor(bowler.bowling.balls / 6)}.${
              bowler.bowling.balls % 6
            }`,
            bowler.bowling.score,
            bowler.bowling.wickets,
          ]}
        />
      )}
    </div>
  );
};

const InPlayPlayers = () => {
  return (
    <div className="inPlayPlayers">
      <InPlayBatsman />
      <InPlayBowler />
    </div>
  );
};

export default InPlayPlayers;
