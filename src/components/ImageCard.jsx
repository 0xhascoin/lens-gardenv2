import React from 'react';

import logo1 from '../styles/images/logo1.png'
function ImageCard({ imageSrc, imageText, imageTitle, imageDesc }) {
  return (
    // <div className="group h-64 w-64 [perspective:1000px]">
    //   <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    //     <div className="absolute inset-0">
    //       <img className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src={imageSrc} alt="" />
    //     </div>
    //     <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
    //       <div className="flex min-h-full flex-col items-center justify-center">
    //         <h1 className="text-3xl font-bold">{imageText}</h1>
    //         <p className="text-lg">Title</p>
    //         <p className="text-base">Description goes here.</p>

    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="group w-[300px] h-[300px] m-auto rounded-lg cursor-pointer">
      <div className='w-full h-full shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] relative'>
        <div className="absolute inset-0">
          <img className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src={imageSrc} alt="" />
        </div>
        {/* <img src={logo1} alt="" className='rounded-lg absolute inset-0 object-cover shadow-xl shadow-black/40' /> */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{imageTitle}</h1>
            <p className="text-lg">{imageText}</p>
            <p className="text-base">{imageDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ImageCard;
