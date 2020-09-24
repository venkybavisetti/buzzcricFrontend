import React from 'react';

const TeamScoreHeader = ({ score, wickets, balls, name }) => {
  return (
    <div className="headerToCenter">
      <div className="teamScoreHeader">
        <div style={{ paddingLeft: '10px' }}>{name}</div>
        <div style={{ paddingRight: '10px' }}>
          {score}-{wickets} ({Math.floor(balls / 6)}.{balls % 6})
        </div>
      </div>
    </div>
  );
};

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

const Batsman = ({ batsman, inPlay }) => {
  let batsmanName = batsman.name;
  if (inPlay && batsmanName === inPlay.batsman) batsmanName += ' **';
  if (inPlay && batsmanName === inPlay.opponentBatsman) batsmanName += ' *';

  return (
    <PlayerDetails
      details={[
        batsmanName,
        batsman.score,
        batsman.balls,
        ((batsman.score / batsman.balls || 0) * 100).toFixed(2),
      ]}
    />
  );
};

const BattedPlayers = ({ batted, inPlay }) => {
  const children = batted.map((batsman, index) => (
    <Batsman key={index} {...{ batsman, inPlay }} />
  ));

  return (
    <div>
      <PlayerDetails
        details={['Batsman', 'R', 'B', 'SR']}
        className="inPlayHdr"
      />
      <div>{children}</div>
    </div>
  );
};

const NotBattedPlayer = ({ player }) => (
  <div className="notBattedPlayer">{player}</div>
);

const NotBattedPlayers = ({ notBatted }) => {
  const children = notBatted.map((player, index) => (
    <NotBattedPlayer key={index} player={player.name} />
  ));

  return (
    <div className="notBattedPlayersBox">
      <div>Did not bat :</div>
      <div className="notBattedPlayers">{children}</div>
    </div>
  );
};

const BattingPerformance = ({ batted, notBatted, inPlay }) => {
  return (
    <div className="battingPerformance">
      <BattedPlayers {...{ inPlay, batted }} />
      <NotBattedPlayers notBatted={notBatted} />
    </div>
  );
};

const BowlersPerformance = ({ bowled }) => {
  const children = bowled.map((bowler, index) => (
    <PlayerDetails
      key={index}
      details={[
        bowler.name,
        `${Math.floor(bowler.balls / 6)}.${bowler.balls % 6}`,
        bowler.score,
        bowler.wickets,
      ]}
    />
  ));

  return (
    <div className="bowlersPerformance">
      <PlayerDetails
        details={['Bowler', 'O', 'R', 'W']}
        className="inPlayHdr"
      />
      {children}
    </div>
  );
};

const PlayersPerformance = ({ batted, bowled, notBatted, inPlay }) => {
  return (
    <div className="playersPerformance">
      <BattingPerformance {...{ batted, notBatted, inPlay }} />
      <BowlersPerformance bowled={bowled} />
    </div>
  );
};

const TeamScoreBoard = ({ team, inPlay }) => {
  console.log(inPlay);
  return (
    <div className="teamScoreBoard">
      <TeamScoreHeader {...team} />
      <PlayersPerformance {...{ ...team, inPlay }} />
    </div>
  );
};

export default TeamScoreBoard;
