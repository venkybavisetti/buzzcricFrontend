import React from 'react';
import Menubar from '../Menubar';

const Home = (props) => {
  return (
    <div>
      <Menubar onHome={true} />
      <div className="homePage">hiii</div>
    </div>
  );
};

export default Home;
