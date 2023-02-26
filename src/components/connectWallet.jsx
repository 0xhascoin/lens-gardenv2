import React from 'react';
import LoadingSpinner from './loadingSpinner';

const Badge = ({ text }) => {
  // console.log("Text: ", text)
  return (
      <span className="text-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
          {text}
      </span>
  )
}

const ConnectWallet = ({ connecting, currentAccount, connectWallet, loadingProfile, profileFound, profile }) => {
  const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

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
        return <p className="bg-white flex justify-center items-center rounded-lg p-1 px-2 mr-5">No Lens Profile Found</p>;
      } else {
        return (
          <div className="flex bg-transparent rounded-lg">
            <img
              className="rounded-lg w-20 ml-auto mr-2"
              src={fixUrl(profile.picture.original.url)}
              alt="profile-image"
            />
            <div className="">
              <p className='text-white flex-col text-sm sm:text-l items-center flex'>{profile.handle}</p>
              <Badge text={`Level ${profile.attributes[0].value}`} />
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
