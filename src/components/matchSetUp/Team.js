import React from 'react';
import InputBox from './InputBox';
import TaskList from './PlayersList';
import Header from './Header';
import './Team.css';

const cloneStructure = (structure) => JSON.parse(JSON.stringify(structure));

const generateId = function () {
  return Math.floor(Math.random() * Date.now());
};

const SetUpTeam = function ({ setTeam, team, defaultTeam }) {
  const deleteTasks = function () {
    setTeam({ players: [], name: defaultTeam });
  };

  const updateTask = function (text, taskId) {
    setTeam((team) => {
      const newTeam = cloneStructure(team);
      const task = newTeam.players.find((task) => task.id === taskId);
      task.text = text;
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

  const createTask = function (text) {
    setTeam((team) => {
      const newTeam = cloneStructure(team);
      newTeam.players.push({ text, id: generateId() });
      return newTeam;
    });
  };

  const deleteTask = function (taskId) {
    setTeam((team) => {
      let newTeam = cloneStructure(team);
      let players = newTeam.players.filter((task) => task.id !== taskId);
      newTeam.players = players;
      return newTeam;
    });
  };

  return (
    <div className="TeamBox">
      <Header
        header={team.name}
        onEnter={updateName}
        deleteTask={deleteTasks}
        className="header"
      />

      <TaskList
        tasks={team.players}
        onEnter={updateTask}
        deleteTask={deleteTask}
        className="task"
      />

      <InputBox onEnter={createTask} />
    </div>
  );
};

export default SetUpTeam;
