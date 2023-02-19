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

    <nav className={`px-4 sm:px-4 py-2.5 w-full`}>
      <div className="container flex  flex-wrap items-center justify-between bg-transparent mx-auto bg-red-600">
        <a href="/" className="flex items-center">

          <img src={logo1} className="rounded shrink w-20 object-contain" alt="Lens-garden logo" />
          <span className="text-2xl ml-8 font-bold whitespace-nowrap hover:text-green-500 text-white font-sans">Lens Garden</span>
        </a>
     

        <div className="flex md:order-2">

          <ConnectWallet
            connectWallet={connectWallet}
            currentAccount={currentAccount}
            loadingProfile={loadingProfile}
            profileFound={profileFound}
            profile={profile}
            connecting={connecting}
          />
          
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          className={`items-center justify-between w-full md:flex md:w-auto  md:order-1 ${navMenuVisible ? "block" : "hidden"
            }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 py-3 mt-4 border border-black-100 rounded-xl bg-zinc-700 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-black dark:bg-black-800 md:dark:bg-transparent dark:border-red-700">

            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4  rounded md:p-0 text-white-400 text-lg hover:text-green-400 transition-all font-sans font-light text-slate-50"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/garden"
                className="block py-2 pl-3 pr-4  rounded md:p-0 text-white-400 text-lg hover:text-green-400 transition-all font-sans font-light text-slate-50"
              >
                View Garden
              </a>
            </li>
            <li>
              <a
                href="/mint"
                className="block py-2 pl-3 pr-4 text-white-700 rounded md:p-0  text-lg  hover:text-green-400 transition-all font-sans font-light text-slate-50"
              >
                Mint Nft
              </a>
            </li>

          </ul>
        </div>

      </div>

    </nav>

  );
}