import React, { useContext } from 'react';
import SetupContext from '../../context/SetupContext';
import './popup.css';

const Header = (props) => {
  const { hostingTeam, visitorTeam } = useContext(SetupContext);
  return (
    <div className="header">
      {hostingTeam} vs {visitorTeam}
    </div>
  );
};

const StartBtn = ({ sendResult }) => (
  <div className="actions">
    <button onClick={sendResult} className="button">
      Start Match
    </button>
  </div>
);

const RadioButton = ({ displayName, value, name, checked }) => {
  return (
    <div>
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked === value}
        readOnly
      />
      {displayName}
    </div>
  );
};

const TossWonBy = () => {
  const { hostingTeam, visitorTeam, setToss, toss } = useContext(SetupContext);
  return (
    <div>
      <div>Toss won by ?</div>
      <div className="extras" onChange={(event) => setToss(event.target.value)}>
        <RadioButton
          displayName={hostingTeam}
          value={hostingTeam}
          name="toss"
          checked={toss}
        />
        <RadioButton
          displayName={visitorTeam}
          value={visitorTeam}
          name="toss"
          checked={toss}
        />
      </div>
    </div>
  );
};

const OptedTo = () => {
  const { setOptedTo, opted } = useContext(SetupContext);
  return (
    <div>
      <div>Opted to ?</div>
      <div
        className="extras"
        onChange={(event) => setOptedTo(event.target.value)}
      >
        <RadioButton
          displayName="Bat"
          value={'bat'}
          name="opted"
          checked={opted}
        />
        <RadioButton
          displayName="Bowl"
          value={'bowl'}
          name="opted"
          checked={opted}
        />
      </div>
    </div>
  );
};

const Overs = () => {
  const { setOvers, overs } = useContext(SetupContext);

  return (
    <div>
      <div>Overs ?</div>
      <input
        className="inputTag"
        value={overs || ''}
        onChange={(event) => setOvers(event.target.value)}
      />
    </div>
  );
};

const PopupContent = () => {
  return (
    <div>
      <TossWonBy />
      <OptedTo />
      <Overs />
    </div>
  );
};

const Popup = ({ closePopup }) => {
  const { sendResult } = useContext(SetupContext);
  return (
    <div className="popup">
      <div className="popup_inner">
        <Header />
        <PopupContent />
        <div>
          <StartBtn sendResult={sendResult} />
          <button onClick={closePopup}>close me</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
