import React, { useEffect, useState } from 'react';
import Menubar from '../Menubar';
import { Link } from 'react-router-dom';
import { buzzcricApi } from '../../api/buzzcricApi';

const data = [
  {
    hostingTeam: { name: 'csk', score: 200, wickets: 4, balls: 20 },
    visitorTeam: { name: 'mi', score: 45, wickets: 5, balls: 120 },
    winner: 'mi',
    tossWon: 'mi',
    opted: 'bat',
    id: 2,
  },
  {
    hostingTeam: { name: 'kkr', score: 220, wickets: 5, balls: 60 },
    visitorTeam: { name: 'mi', score: 450, wickets: 2, balls: 200 },
    winner: null,
    tossWon: 'mi',
    opted: 'bat',
    id: 1,
  },
];

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

const MatchStatus = ({ winner, tossWon, opted }) => {
  return (
    <div className="matchBoxStatus">
      {winner
        ? `${winner} won the match`
        : `toss won by ${tossWon} ${opted} first`}
    </div>
  );
};

const MatchBox = ({ matchDetails }) => {
  const { hostingTeam, visitorTeam, winner, tossWon, opted } = matchDetails;
  return (
    <Link className="matchBoxLink" to={`/scoreBoard/${matchDetails.id}`}>
      <div className="matchBox">
        <TeamScoreCard {...hostingTeam} />
        <TeamScoreCard {...visitorTeam} />
        <MatchStatus {...{ winner, tossWon, opted }} />
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
    const interval = setInterval(
      () => buzzcricApi({ type: 'getMatches' }).then(setMatches),
      1000 * timeToFetch
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return [matches];
};

const Home = (props) => {
  const [matches] = useTimer(5);

  return (
    <div>
      <Menubar onHome={true} />
      <Matches matches={matches} />
    </div>
  );
};

export default Home;
