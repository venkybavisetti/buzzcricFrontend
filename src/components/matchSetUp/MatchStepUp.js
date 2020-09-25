import React, { useState } from 'react';
import SetUpTeam from './Team';
import Menubar from '../Menubar';
import { buzzcricApi } from '../../api/buzzcricApi';
import { useHistory } from 'react-router-dom';
import Popup from './Popup';
import SetupContext from '../../context/SetupContext';
import { useGetUser } from '../getUser';

import './Team.css';

const getTeams = (team) => {
  let newTeam = {};
  newTeam.name = team.name;
  newTeam.players = team.players.map((player) => player.text);
  return newTeam;
};

const MatchStepUp = (props) => {
  const hostTeamName = 'Hosting Team?';
  const visitorTeamName = 'Visitor Team?';
  let history = useHistory();
  const user = useGetUser();

  const [hostingTeam, setHostingTeam] = useState({
    name: hostTeamName,
    players: [],
  });

  const [visitorTeam, setVisitorTeam] = useState({
    name: visitorTeamName,
    players: [],
  });

  const [showPopup, setPopup] = useState(false);

  const [toss, setToss] = useState(null);
  const [opted, setOptedTo] = useState(null);
  const [overs, setOvers] = useState(null);

  const sendResult = () => {
    buzzcricApi({
      type: 'setupMatch',
      data: {
        matchDetails: { opted, overs: +overs, toss },
        visitorTeam: getTeams(visitorTeam),
        hostingTeam: getTeams(hostingTeam),
      },
    }).then((id) => {
      history.push(`/updateScoreCard/${id}`);
    });
  };

  return (
    <div>
      <Menubar imgUrl={user.img} />
      <div className="matchStepup">
        <div className="setupTeams">
          <SetUpTeam
            team={hostingTeam}
            setTeam={setHostingTeam}
            defaultTeam={hostTeamName}
          />
          <SetUpTeam
            team={visitorTeam}
            setTeam={setVisitorTeam}
            defaultTeam={visitorTeamName}
          />
        </div>
        <div className="nextBtnDiv">
          <button onClick={() => setPopup((showPopup) => !showPopup)}>
            Next
          </button>
        </div>
        <SetupContext.Provider
          value={{
            hostingTeam: hostingTeam.name,
            visitorTeam: visitorTeam.name,
            overs,
            opted,
            toss,
            setToss,
            setOptedTo,
            setOvers,
            sendResult,
          }}
        >
          {showPopup && (
            <Popup closePopup={() => setPopup((showPopup) => !showPopup)} />
          )}
        </SetupContext.Provider>
      </div>
    </div>
  );
};

export default MatchStepUp;
