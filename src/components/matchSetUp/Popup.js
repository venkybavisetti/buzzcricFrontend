import React, { useContext } from 'react';
import SetupContext from '../../context/SetupContext';

const Header = (props) => {
  const { hostingTeam, visitorTeam } = useContext(SetupContext);
  return (
    <h1 className="scoreBoardHdr">
      {hostingTeam} <span className="vs">VS</span>
      {visitorTeam}
    </h1>
  );
};

const StartBtn = ({ sendResult }) => (
  <div className="nextBtnDiv">
    <button onClick={sendResult} className="nextBtn">
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
    <div className="toss">
      <div className="subHdr"> Toss won by ?</div>
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
    <div className="opted">
      <div className="subHdr">Opted to ?</div>
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
    <div className="overs">
      <div className="subHdr">Overs ?</div>
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
    <div className="popupContent">
      <TossWonBy />
      <OptedTo />
      <Overs />
    </div>
  );
};

const CloseBtn = ({ closePopup }) => (
  <div className="closeBtn" onClick={closePopup}>
    x
  </div>
);

const Popup = ({ closePopup }) => {
  const { sendResult } = useContext(SetupContext);
  return (
    <div className="popup">
      <div className="popupInner">
        <Header />
        <PopupContent />
        <div>
          <StartBtn sendResult={sendResult} />
          <CloseBtn closePopup={closePopup} />
        </div>
      </div>
    </div>
  );
};

export default Popup;
