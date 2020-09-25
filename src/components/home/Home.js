import React, { useContext, useEffect, useState } from 'react';
import Menubar from '../Menubar';
import { Link } from 'react-router-dom';
import { buzzcricApi } from '../../api/buzzcricApi';
import { MatchStatusMsg, MatchStatus } from '../MatchScoreBoard/MatchStatus';
import { useGetUser } from '../getUser';

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

const useTimer = (timeToFetch = 10) => {
  const [matches, setMatches] = useState(null);
  useEffect(() => {
    buzzcricApi({ type: 'getMatches' }).then(setMatches);
    const interval = setInterval(
      () => buzzcricApi({ type: 'getMatches' }).then(setMatches),
      1000 * timeToFetch
    );
    return () => {
      clearInterval(interval);
    };
  }, [timeToFetch]);

  return [matches];
};

const Home = (props) => {
  const [matches] = useTimer(5);
  const user = useGetUser();

  return (
    <div>
      <Menubar onHome={true} imgUrl={user.img} />
      <Matches matches={matches} />
    </div>
  );
};

export default Home;
