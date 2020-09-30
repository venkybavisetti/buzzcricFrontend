import React, { useContext, useEffect } from 'react';
import Menubar from '../Menubar';
import { Link } from 'react-router-dom';
import { MatchStatusMsg, MatchStatus } from '../MatchScoreBoard/MatchStatus';
import { useTimer } from '../utilities';
import UserContext from '../../context/UserContext';
import { buzzcricApi } from '../../api/buzzcricApi';

const TeamScoreCard = ({ name, score, wickets, balls }) => {
  return (
    <div className="teamScoreCard">
      <div className="teamName">{name}</div>
      <div className="teamScores">
        {score}-{wickets} ({Math.floor(balls / 6)}.{balls % 6})
      </div>
    </div>
  );
};

const MatchBox = ({ matchDetails }) => {
  return (
    <Link className="matchBoxLink" to={`/scoreBoard/${matchDetails.id}`}>
      <div className="matchBox">
        <MatchStatus winner={matchDetails.winner} />
        <TeamScoreCard {...{ ...matchDetails.hostingTeam }} />
        <TeamScoreCard {...{ ...matchDetails.visitorTeam }} />
        <MatchStatusMsg {...{ ...matchDetails, className: 'matchBoxStatus' }} />
      </div>
    </Link>
  );
};

const Matches = ({ matches }) => {
  if (!matches) return <p>loading....</p>;
  const children = matches.map((match, index) => (
    <MatchBox matchDetails={match} key={index} />
  ));

  return <div className="homePage">{children}</div>;
};

const Home = (props) => {
  const matches = useTimer({ type: 'getMatches' }, 5);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    buzzcricApi({ type: 'getUser' }).then((user) => {
      setUser(user);
    });
  }, [setUser]);

  return (
    <div>
      <Menubar onHome={true} />
      <Matches matches={matches} />
    </div>
  );
};

export default Home;
