import React from 'react';
import InputBox from './InputBox';
import PlayerList from './PlayersList';
import Header from './Header';

const cloneStructure = (structure) => JSON.parse(JSON.stringify(structure));

const generateId = function () {
  return Math.floor(Math.random() * Date.now());
};

const SetUpTeam = function ({ setTeam, team, defaultTeam }) {
  const deletePlayers = function () {
    setTeam({ players: [], name: defaultTeam });
  };

  const updatePlayer = function (text, playerId) {
    setTeam((team) => {
      const newTeam = cloneStructure(team);
      const player = newTeam.players.find((player) => player.id === playerId);
      player.text = text;
      return newTeam;
    });
  };

  const updateName = (newName) => {
    setTeam((team) => {
      const newTeam = cloneStructure(team);
      newTeam.name = newName;
      return newTeam;
    });
  };

  const createPlayer = function (text) {
    setTeam((team) => {
      const newTeam = cloneStructure(team);
      newTeam.players.push({ text, id: generateId() });
      return newTeam;
    });
  };

  const deletePlayer = function (playerId) {
    setTeam((team) => {
      let newTeam = cloneStructure(team);
      let players = newTeam.players.filter((player) => player.id !== playerId);
      newTeam.players = players;
      return newTeam;
    });
  };

  return (
    <div className="TeamBox">
      <Header
        header={team.name}
        onEnter={updateName}
        deletePlayer={deletePlayers}
        className="setupTeamHeader"
      />

      <PlayerList
        players={team.players}
        onEnter={updatePlayer}
        deletePlayer={deletePlayer}
        className="player"
      />

      <InputBox onEnter={createPlayer} />
    </div>
  );
};

export default SetUpTeam;
