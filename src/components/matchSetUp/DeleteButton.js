import React from 'react';

const AddDeleteBtn = function (Component) {
  return function (props) {
    return (
      <div className="container">
        <Component {...props} />
        <div className="deleteBtn" onClick={() => props.deleteTask(props.id)}>
          X
        </div>
      </div>
    );
  };
};

export default AddDeleteBtn;
