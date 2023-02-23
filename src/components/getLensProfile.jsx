import React, { useState, useEffect } from 'react'
import { client, myStats } from '../../api/lensApi';
import LoadingSpinner from './loadingSpinner';


const GetLensProfile = ({ currentAccount, setProfile, profile, setProfileFound, profileFound, setLoadingProfile, loadingProfile }) => {
  const startUrl = "https://lens.infura-ipfs.io/ipfs/";

  const fetchLensProfile = async () => {
    try {
      setLoadingProfile(true);
      console.log("Loading Profile....")
      const { data: { profiles: { items } } } = await client.query(myStats, { "address": currentAccount }).toPromise();
      console.log("Data: ", items[0]);
      if (items[0] == undefined) {
        setProfileFound(false);
      } else {
        setProfile(items[0]);
        setProfileFound(true);
        console.log("Found Profile.")
      }
      setLoadingProfile(false);
      console.log("Finished Loading Profile....")

    } catch (error) {
      console.log(error);
      setProfileFound(false);
      setLoadingProfile(false);
    }
  };

  const renderProfile = () => {
    if (loadingProfile) {
      return <LoadingSpinner />
    } else {
      if (!profileFound) {
        return <p>No Lens Profile Found</p>
      } else {
        return 
        
        <ProfileDetails profile={profile} />
      
        
      }
    }
  };

  useEffect(() => {
    if (currentAccount !== "") fetchLensProfile();
  }, [])


  return (
    <div>
      {renderProfile()}
    </div>
  )
}

export default GetLensProfile