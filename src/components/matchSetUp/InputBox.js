import React, { useState } from 'react';

const InputBox = (props) => {
  const [text, setText] = useState(props.inputText || '');

  const handleKeyPress = (event) => {
    const text = event.target.value;
    if (event.keyCode === 13 && text !== '') {
      props.onEnter(event.target.value);
      setText('');
    }
  };

  return (
    <input
      className="inputTag"
      value={text}
      onChange={(event) => setText(event.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
};

export default InputBox;
