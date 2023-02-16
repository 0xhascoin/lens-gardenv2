import React from 'react';
import '../styles/connectWallet.css';
import LoadingSpinner from './loadingSpinner';

const ConnectWallet = ({ connecting, currentAccount, connectWallet, loadingProfile, profileFound, profile }) => {
  const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

  const renderConnected = () => {
    if (currentAccount === '') {
      if (connecting) {
        return <LoadingSpinner />
      } else {
        return (
          <div className="flex connect-button1 bg-gradient-to-r from-emerald-500 to-green-300 rounded-lg mr-2">
            <button onClick={connectWallet} className="text-white focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 md:mr-0 dark:bg-green-700 dark:hover:bg-green-600">
              Connect Wallet
            </button>
          </div>
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
          <div className="sm:flex sm:justify-center sm:items-center mr-5 p-1 px-2 bg-white rounded-lg">
            <img
              className="rounded-lg w-20 ml-auto border border-white mr-2"
              src={`${startUrl}${profile.picture.original.url.slice(7)}`}
              alt="profile-image"
            />
            <p>{profile.handle}</p>
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
