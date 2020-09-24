import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/home/Home';
import MatchStepUp from '../components/matchSetUp/MatchStepUp';
import UpdateScore from '../components/updateScoreCard/UpdateScore';
import ScoreBoard from '../components/MatchScoreBoard/ScoreBoard';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/setupMatch" component={MatchStepUp} />
      <Route exact path="/updateScoreCard/:id" component={UpdateScore} />
      <Route exact path="/scoreBoard/:id" component={ScoreBoard} />
    </Switch>
  );
};

export default AppRoutes;
