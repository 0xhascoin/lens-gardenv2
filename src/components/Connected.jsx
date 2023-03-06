
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDisconnect, useAccount } from 'wagmi'
import { useState, useEffect } from 'react';
import { client, getLensProfile_Header } from '../../api/lensApi';


const LoadingSpinner = () => {
    return (
        <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-zinc-800 animate-spin dark:text-gray-600 fill-emerald-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}


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
      const { data: { profiles: { items } } } = await client.query(getLensProfile_Header, { "address": address }).toPromise();
      
      // Profile not found / doesn't exist
      if (items[0] == undefined) {
        setProfileFound(false);
      } else {
        // Profile found
        setProfile(items[0]);

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

  useEffect(() => {
    fetchLensProfile(address)
  }, [])
  
  return (
   <>
     {renderProfile()}
   </>
  )
}
