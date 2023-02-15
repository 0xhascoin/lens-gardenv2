import React from 'react';
import '../styles/connectWallet.css';

const ConnectWallet = ({ currentAccount, connectWallet, loadingProfile, profileFound, profile }) => {
  const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

  const renderConnected = () => {
    if (currentAccount === '') {
      return (
        <div className="flex connect-button1">
          <button onClick={connectWallet} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Connect Wallet
          </button>
        </div>
      );
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
