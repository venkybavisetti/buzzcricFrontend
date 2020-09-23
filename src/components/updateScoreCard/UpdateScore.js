import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menubar from '../Menubar';
import { buzzcricApi } from '../../api/buzzcricApi';

const ScoreBoard = (props) => {
  const { target, team, inning, score, wickets, overs } = props;
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
  console.log(batsman);

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

const InPlayBatsman = ({ batsman, opponentBatsman }) => {
  const strick = batsman && <Batsman batsman={batsman} isInStrick={true} />;

  const nonStrick = opponentBatsman && (
    <Batsman batsman={opponentBatsman} isInStrick={false} />
  );

  return (
    <div>
      <PlayerDetails
        details={['Batsman', 'R', 'B', 'SR']}
        className="inPlayHdr"
      />
      {strick}
      {nonStrick}
    </div>
  );
};

const InPlayBowler = ({ bowler }) => {
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
            `${Math.ceil(bowler.bowling.balls / 6)}.${
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

const InPlayPlayers = ({ batsman, opponentBatsman, bowler }) => {
  return (
    <div className="inPlayPlayers">
      <InPlayBatsman batsman={batsman} opponentBatsman={opponentBatsman} />
      <InPlayBowler bowler={bowler} />
    </div>
  );
};

const getBallClass = (runs) => {
  console.log(typeof runs);
  let className = 'ball ';
  if (!Number.isInteger(+runs)) className += runs.slice(-2);
  else className += 'run' + runs;
  return className;
};

const ThisOver = ({ currentOver }) => {
  const balls = currentOver.map((runs, index) => (
    <div className={getBallClass(runs)} key={index}>
      {runs}
    </div>
  ));
  return <div className="balls thisOver">{balls}</div>;
};

const RadioButton = ({ displayName, value, selectedValue }) => {
  return (
    <div>
      <input
        type="radio"
        value={value}
        name="extras"
        checked={selectedValue === value}
        readOnly
      />
      {displayName}
    </div>
  );
};

const RadioButtons = ({ setExtras, extras }) => {
  return (
    <div className="extras" onChange={(event) => setExtras(event.target.value)}>
      <div>
        <RadioButton displayName="Wide" value="wd" selectedValue={extras} />
        <RadioButton displayName="No Ball" value="nb" selectedValue={extras} />
      </div>
      <div>
        <RadioButton displayName="Leg Byes" value="lb" selectedValue={extras} />
        <RadioButton displayName="Wicket" value="wk" selectedValue={extras} />
      </div>
    </div>
  );
};

const UpdateScores = ({ updateScores }) => {
  const [extras, setExtras] = useState(null);

  const updateScore = (run) => {
    let runs = run.toString();
    if (extras) runs = run + extras;
    setExtras(null);
    updateScores(runs);
  };

  const children = [0, 1, 2, 3, 4, 6].map((run) => (
    <div
      onClick={() => updateScore(run)}
      className={getBallClass(run)}
      key={run}
    >
      {run}
    </div>
  ));

  return (
    <div className="updateScores">
      <RadioButtons setExtras={setExtras} extras={extras} />
      <div className="balls ballRuns">{children}</div>
    </div>
  );
};

const SelectingNextPlayer = ({ displayName, players, selectPlayer }) => {
  let children = players.map((player, index) => (
    <option value={player} key={index}>
      {player}
    </option>
  ));

  children.unshift(
    <option value="select" key="select">
      select
    </option>
  );

  return (
    <div className="selectingPlayer">
      <div>{displayName} : </div>
      <div>
        <select onChange={(event) => selectPlayer(event.target.value)}>
          {children}
        </select>
      </div>
    </div>
  );
};

const SelectingNextPlayers = (props) => {
  const { batsman, opponentBatsman, bowler, updateInPP, id } = props;
  const [players, setPlayers] = useState(null);
  const [selectedPlayers, selectPlayers] = useState({
    strick: null,
    nonStrick: null,
    bowler: null,
  });

  const updateSelectedPlayers = (role, player) => {
    selectPlayers((selectedPlayers) => {
      selectedPlayers[role] = player;
      return selectedPlayers;
    });
  };

  const updateInPlay = () => {
    updateInPP(selectedPlayers);
  };

  useEffect(() => {
    buzzcricApi({ type: 'choosePlayers', id }).then(setPlayers);
  }, [id]);

  if (players === null) return <p>Loading...</p>;

  return (
    <div className="playerSelection">
      <div className="selectPlayers">
        {!batsman && (
          <SelectingNextPlayer
            displayName="Next Batsman"
            players={players.strike}
            selectPlayer={updateSelectedPlayers.bind(null, 'strick')}
          />
        )}
        {!opponentBatsman && (
          <SelectingNextPlayer
            displayName="Next Batsman"
            players={players.nonStrike}
            selectPlayer={updateSelectedPlayers.bind(null, 'nonStrick')}
          />
        )}
        {!bowler && (
          <SelectingNextPlayer
            displayName="Next Bowler"
            players={players.bowler}
            selectPlayer={updateSelectedPlayers.bind(null, 'bowler')}
          />
        )}
      </div>
      <button onClick={updateInPlay}>click</button>
    </div>
  );
};

const UpdatingBox = ({
  batsman,
  opponentBatsman,
  bowler,
  updateInPP,
  id,
  updateScores,
}) => {
  if (batsman && opponentBatsman && bowler)
    return <UpdateScores {...{ updateScores }} />;
  return (
    <SelectingNextPlayers
      {...{ batsman, opponentBatsman, bowler, updateInPP, id }}
    />
  );
};

const UpdateScore = (props) => {
  const { id } = useParams();
  const [inPlay, setInPlay] = useState(null);

  const updateInPP = (inPlay) => {
    buzzcricApi({ type: 'updateInPP', id, data: inPlay }).then(setInPlay);
  };

  const updateScores = (ball) => {
    buzzcricApi({ type: 'updateScore', id, data: { ball } }).then(setInPlay);
  };

  useEffect(() => {
    buzzcricApi({ type: 'getInPlay', id }).then(setInPlay);
  }, [id]);

  if (inPlay === null) return <p>Loading...</p>;
  return (
    <div>
      <Menubar />
      <div>
        <ScoreBoard {...inPlay.scoreBoard} />
        <InPlayPlayers {...inPlay} />
        <ThisOver currentOver={inPlay.currentOver} />
        <UpdatingBox {...{ ...inPlay, updateInPP, updateScores, id }} />
      </div>
    </div>
  );
};

export default UpdateScore;
