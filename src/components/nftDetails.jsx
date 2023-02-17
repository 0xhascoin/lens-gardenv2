import React from 'react'
// import '../styles/nftDetails.css'
import Tree from '../styles/images/Tree.jpg';
import ImageCard from './ImageCard';

const NftDetails = () => {
    return (
        <div className="nfts flex justify-center ">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 py-3">
           <ImageCard imageSrc={'https://cdn.midjourney.com/a89f296d-cfd2-4991-b2a1-17cf4ee45fe5/grid_0.png'} imageTitle={"Lens Garden NFT #1: Seed"} imageText={"Unlocks at level 0"} imageDesc={"0 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/e8da90a1-f4e6-469b-897c-6ed7fb6dbc93/grid_0.png'} imageTitle={"Lens Garden NFT #2: Sprout"} imageText={"Unlocks at level 5"} imageDesc={"8,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/1c2ee78c-0806-457e-9799-ff68cdcdad8b/grid_0.png'} imageTitle={"Lens Garden NFT #3: Plant"} imageText={"Unlocks at level 10"} imageDesc={"256,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/feac2f1f-422d-44b4-97c7-b16a2b2707ca/grid_0.png'} imageTitle={"Lens Garden NFT #4: Charm"} imageText={"Unlocks at level 15"} imageDesc={"8,200,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/262dd3af-4b2e-47f7-afdb-41b683a366c2/grid_0.png'} imageTitle={"Lens Garden NFT #5: Baby tree"} imageText={"Unlocks at level 20"} imageDesc={"262,416,000 XP points needed to unlock this"}/>
           <ImageCard imageSrc={'https://cdn.midjourney.com/b4fa6557-3bb7-492d-8667-86d21494bee1/grid_0.png'} imageTitle={"Lens Garden NFT #6: Lens Tree"} imageText={"Unlocks at level 25"} imageDesc={"8,397,344,000 XP points needed to unlock this"} />
          <div className='col-span-3'>
           <ImageCard imageSrc={'https://cdn.midjourney.com/8f465009-fd05-444d-b8be-469ef7fe2ea7/grid_0.png'} imageTitle={"Lens Garden NFT #7: Oak"} imageText={"Unlocks at level 30"} imageDesc={"8,397,344,000 XP points needed to unlock this"} />
         </div>
         </div>
       </div>
    )
}

export default NftDetails