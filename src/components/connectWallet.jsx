import React from 'react';
import LoadingSpinner from './loadingSpinner';

const Badge = ({ text }) => {
  // console.log("Text: ", text)
  return (
      <span className="text-center bg-green-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-white text-white border border-white">
          {text}
      </span>
  )
}

const ConnectWallet = ({ connecting, currentAccount, connectWallet, loadingProfile, profileFound, profile }) => {
  const startUrl = 'https://lens.infura-ipfs.io/ipfs/';


  const calculateLevel = (following, followers, posts, collects, mirrors, comments) => {
    let experience =  (following * 10) + (followers * 50) + (posts * 30) + (collects * 20) + (mirrors * 30) + (comments * 20);
    let level = 1;
    let threshold = 100;
    let experienceToNextLevel = threshold;
    while (experience >= threshold) {
        level += 1;
        threshold *= 1.5;
    }
    experienceToNextLevel = Math.floor(threshold - experience);

    console.log("Level: ", level)

    return level;
}

  const fixUrl = (url) => {
    let start = url.slice(5)
    let final;
    if(url.slice(0,4) !== "http") {
      final = startUrl + url.slice(7);
     } else {
      final = url
    }
    return final;
  }

  const renderConnected = () => {
    if (currentAccount === '') {
      if (connecting) {
        return <LoadingSpinner />
      } else {
        return (
          
            <button onClick={connectWallet} className="text-white focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 md:mr-0 bg-gradient-to-r from-emerald-600 to-teal-400 dark:bg-emeral-700 dark:hover:bg-green-600">
              Connect Wallet
            </button>
          
        );
      }
    } else {
      return <>{renderProfile()}</>;
    }
  };

  const renderProfile = () => {
    if (loadingProfile) {
      return <LoadingSpinner />;
    } else {
      if (!profileFound) {
        return <p className="bg-green-600 flex justify-center items-center rounded-lg p-1 px-2 mr-5">No Lens Profile Found</p>;
      } else {
        return (
          <div className="flex bg-transparent rounded-lg">
            {console.log(profile)}
            <img
              className="rounded-lg w-12 sm:w-16 ml-auto mr-2"
              src={fixUrl(profile.picture.original.url)}
              alt="profile-image"
            />
            <div className="sm:grid sm:grid-cols-1 sm:gap-y-4">
              <p className='text-white flex-col text-sm sm:text-l items-center flex'>{profile.handle}</p>
              <Badge text={`Level ${calculateLevel(profile.stats.totalFollowing, profile.stats.totalFollowers, profile.stats.totalPosts, profile.stats.totalCollects, profile.stats.totalMirrors, profile.stats.totalComments)}`} />
            </div>
          </div>
        );
      }
    }
  };

  return (
    <>
      {renderConnected()}
    </>
  );
};

export default ConnectWallet;
