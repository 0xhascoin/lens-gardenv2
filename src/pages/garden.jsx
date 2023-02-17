import '../styles/garden.css'
import React from "react";
import Header from "../components/header";
import bggarden2 from "../styles/images/bggarden2.jpeg"
import ProfileDetails from '../components/profileDetails';
import PointsCalculation from '../components/pointsCalculation';
import Points from '../components/points';
import followings from '../styles/images/stats/followings.png';
import followers from '../styles/images/stats/followers.png';
import posts from '../styles/images/stats/posts.png';
import comments from '../styles/images/stats/comments.png';
import collects from '../styles/images/stats/collects.png';
import mirrors from '../styles/images/stats/mirrors.png';

const Garden = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bggarden2})` }}>
      <div className="relative">
       
        <div className="fixed bottom-0 left-0 right-0 text-center">
          <Points imageSrc={posts} imageTitle={"30 XP"}  />
          <Points imageSrc={comments} imageTitle={"20 XP"} />
        </div>
        <div className="fixed bottom-0 left-0 text-center">
          <Points imageSrc={followings} imageTitle={"10 XP"} />
          <Points imageSrc={followers} imageTitle={"50 XP"} />
        </div>
        <div className="fixed bottom-0 right-0 text-center">
          <Points imageSrc={collects} imageTitle={"20 XP"} />
          <Points imageSrc={mirrors} imageTitle={"30 XP"} />
        </div>
      </div>
    </div>
  );
};

export default Garden;
