import React from 'react';
import Header from './Header';

const PlayerList = function (props) {
  const { players, onEnter, deletePlayer, className } = props;
  const playerList = players.map((player) => {
    return (
      <Header
        header={player.text}
        key={player.id}
        id={player.id}
        onEnter={onEnter}
        deletePlayer={deletePlayer}
        className={className}
      />
    );
  });
  return <div>{playerList}</div>;
};

export default PlayerList;
