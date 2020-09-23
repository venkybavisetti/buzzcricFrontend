import React, { useState } from 'react';
import InputBox from './InputBox';
import AddDeleteBtn from './DeleteButton';

const DisplayHeaderText = (props) => (
  <div className={props.className}>
    <span onClick={props.editMode}>{props.header}</span>
  </div>
);

const HeaderWithDeleteBtn = AddDeleteBtn(DisplayHeaderText);

const Header = (props) => {
  const [isEditMode, setOnEditMode] = useState(false);

  const updateHeader = (text) => {
    props.onEnter(text, props.id);
    setOnEditMode(false);
  };

  const editMode = () => {
    setOnEditMode(true);
  };

  if (isEditMode)
    return (
      <div className={props.className}>
        <InputBox onEnter={updateHeader} inputText={props.header} />
      </div>
    );

  return (
    <HeaderWithDeleteBtn
      header={props.header}
      editMode={editMode}
      deleteTask={props.deleteTask}
      className={props.className}
      id={props.id}
    />
  );
};

export default Header;
