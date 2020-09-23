import React from 'react';
import Header from './Header';

const TaskList = function (props) {
  const { tasks, onEnter, deleteTask, className } = props;
  const taskList = tasks.map((task) => {
    return (
      <Header
        header={task.text}
        key={task.id}
        id={task.id}
        onEnter={onEnter}
        deleteTask={deleteTask}
        className={className}
      />
    );
  });
  return <div>{taskList}</div>;
};

export default TaskList;
