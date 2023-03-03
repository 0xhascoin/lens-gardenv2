import React, { useState, useRef } from "react";
import logo1 from "../styles/images/logo1.png";
import ConnectWallet from "./connectWallet";




export default function Header({ currentAccount, connecting, connectWallet, loadingProfile, profileFound, profile }) {
  const [navMenuVisible, setNavMenuVisible] = useState(false);
  // Define the toggleNavMenu function
  const toggleNavMenu = () => {
    setNavMenuVisible(!navMenuVisible);
  };

  return (

    <nav className={`font w-full`}>
      <div className="pt-2 flex sm:flex-wrap flex-wrap items-center justify-between bg-transparent mx-auto">
        <a href="/" className="flex items-center">

          <img src={logo1} className="nft ml-2 rounded-lg shrink w-12 sm:w-16 object-contain" alt="Lens-garden logo" />
          <span className="chart font hover:text-green-500 ml-4 text-white sm:text-2xl md:text-3xl hidden md:block element-to-hide">Lens Garden</span>

        </a>
     

        <div className="flex sm:mx-0 mx-auto sm:order-2 sm:mr-2 sm:right-0">

          <ConnectWallet
          
            connectWallet={connectWallet}
            currentAccount={currentAccount}
            loadingProfile={loadingProfile}
            profileFound={profileFound}
            profile={profile}
            connecting={connecting}
          />
          
        </div>
        <div className="">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-transparent dark:focus:ring-white-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={toggleNavMenu}
          >
            
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
             
            </svg>
            
          </button>
          </div>
        <div
          className={`items-center justify-center mx-auto w-full md:flex md:w-auto  md:order-1 ${navMenuVisible ? "block" : "hidden"
            }`}
          id="navbar-sticky"
        >
          <ul className="bg-slate-800 flex flex-col p-4 py-3 mt-4 border border-black-100 rounded-xl  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:dark:bg-transparent dark:border-green-400">

            <li>
              <a
                href="/"
                className="font chart block py-2 pl-3 pr-4 sm:text-2xl md:text-3xl rounded md:p-0 text-white-400 hover:text-green-500 transition-all text-slate-50"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/garden"
                className="font chart sm:text-2xl block py-2 pl-3 pr-4 md:text-3xl  rounded md:p-0 hover:text-green-500 transition-all text-slate-50"
              >
                View Garden
              </a>
            </li>
            <li>
              <a
                href="/roadmap"
                className="font chart sm:text-2xl block py-2 pl-3 pr-4 md:text-3xl  rounded md:p-0 hover:text-green-500 transition-all text-slate-50"
              >
                Roadmap
              </a>
            </li>
           

          </ul>
        </div>

      </div>

    </nav>

  );
}