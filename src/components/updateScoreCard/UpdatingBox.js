import React, { useContext, useState, useEffect } from 'react';
import UpdateScoreContext from '../../context/UpdateScoreContext';
import { getBallClass } from './utilities';
import { buzzcricApi } from '../../api/buzzcricApi';

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

const UpdateScores = () => {
  const { updateScores } = useContext(UpdateScoreContext);
  const [extras, setExtras] = useState(null);

  const updateBall = (run) => {
    let runs = run.toString();
    if (extras) runs = run + extras;
    setExtras(null);
    updateScores(runs);
  };

  const children = [0, 1, 2, 3, 4, 6].map((run) => (
    <div
      onClick={() => updateBall(run)}
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

const SelectingNextPlayers = () => {
  const { id, updateInPP, inPlay } = useContext(UpdateScoreContext);
  const { batsman, opponentBatsman, bowler } = inPlay;

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

const UpdatingBox = () => {
  const { batsman, opponentBatsman, bowler } = useContext(
    UpdateScoreContext
  ).inPlay;

  if (batsman && opponentBatsman && bowler) return <UpdateScores />;
  return <SelectingNextPlayers />;
};

export default UpdatingBox;
