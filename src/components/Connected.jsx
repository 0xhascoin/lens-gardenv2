
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDisconnect, useAccount } from 'wagmi'
import { useState, useEffect } from 'react';
import { client, myStats } from '../../api/lensApi';
import { checkIfUserExists } from '../../api/firebase';

// Components
import LoadingSpinner from './loadingSpinner';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Connected() {
  const { disconnect } = useDisconnect()
  const { address, isConnecting, isDisconnected } = useAccount()


  const logout = () => {
    disconnect();
    // window.location.reload();
  }

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileFound, setProfileFound] = useState(false);


  const fetchLensProfile = async (address) => {
    try {
      // Start Loading Profile from Lens API
      setLoadingProfile(true);
      console.log("Loading Profile....");

      // Destructure the object
      const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();

      // Profile not found / doesn't exist
      if (items[0] == undefined) {
        setProfileFound(false);
      } else {
        // Profile found
        setProfile(items[0]);
        await setupProfileInDB(items[0].ownedBy, items[0]);

        console.log("Found Profile.");
        setProfileFound(true);
      }

      // Finished Loading Profile
      setLoadingProfile(false);
      console.log("Finished Loading Profile....");

    } catch (error) {
      console.log(error);
      setProfileFound(false);
      setLoadingProfile(false);
    }
  };

  const startUrl = 'https://lens.infura-ipfs.io/ipfs/';

  const calculateLevel = (following, followers, posts, collects, mirrors, comments) => {
    let experience = (following * 10) + (followers * 50) + (posts * 30) + (collects * 20) + (mirrors * 30) + (comments * 20);
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
    if (url.slice(0, 4) !== "http") {
      final = startUrl + url.slice(7);
    } else {
      final = url
    }
    return final;
  }

  const renderProfile = () => {
    if (loadingProfile) {
      return <LoadingSpinner />
    } else {
      if (!profileFound) {
        return <p className="bg-green-600 flex justify-center items-center rounded-lg p-1 px-2 mr-5">No Lens Profile Found</p>;
      } else {
        return (

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex w-full items-center border-none justify-between gap-x-1.5 rounded-md bg-transparent text-sm font-semibold text-gray-900">
                {/* Image */}
                <div className="rounded-lg">
                  <img className="h-14 rounded-lg" src={fixUrl(profile.picture.original.url)} />

                </div>
                {/* Handle */}
                <div className="text-left text-sm p-2 text-white">
                  <div>
                    {profile.handle}
                  </div>
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{`Level ${calculateLevel(profile.stats.totalFollowing, profile.stats.totalFollowers, profile.stats.totalPosts, profile.stats.totalCollects, profile.stats.totalMirrors, profile.stats.totalComments)}`}</span>
                  </div>
                </div>
                <ChevronDownIcon className="-mr-1 h-8 w-8 text-white" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                        onClick={logout}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>

                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        );
      }
    }
  };

  const setupProfileInDB = async (address, obj) => {
    await checkIfUserExists(address, obj);
  }
  useEffect(() => {
    fetchLensProfile(address)
  }, [])

  return (
    <>
      {renderProfile()}
    </>
  )
}
