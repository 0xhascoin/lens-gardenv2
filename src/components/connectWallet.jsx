import React from 'react';
import '../styles/connectWallet.css';

const ConnectWallet = ({ currentAccount, connectWallet, loadingProfile, profileFound, profile }) => {
  const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

  const renderConnected = () => {
    if (currentAccount === '') {
      return (
        <div className="flex connect-button1">
          <button onClick={connectWallet} className="">
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
        return <p className="">No Lens Profile Found</p>;
      } else {
        return (
          <div className=" bg-lime-900">
            <img
              className="rounded-full w-20 ml-auto"
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
