import React from 'react'
import '../styles/hero.css'
import { BsGlobe } from 'react-icons/bs'
const Hero = () => {

  return (
    <div className='hero flex justify-center place-items-center'>
      
      <div className='text-center font-bold text-white text-3xl h-full'>
        <h2 className='mb-3 font-sans font-light text-slate-50 text-5xl'>Welcome to Lens Garden</h2>
        <p className='text-lg font-sans font-light text-slate-50'>Lens Garden is the first NFT collection on Lens.</p>
        <p className='text-lg font-sans font-light text-slate-50'>Your NFT is connected to your activity on the Lens Protocol ecosystem.</p>
        <p className='text-lg font-sans font-light text-slate-50'>Level up your NFT by using the protocol.</p>
        <div className='items-center justify-center mx-auto flex mt-2'> <a href="https://twitter.com/LensGardenNFT" target="_blank" className="text-gray-100 hover:text-gray-50 dark:hover:text-white">
                <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-100 hover:text-gray-50 dark:hover:text-white">
            <svg className='h-12 w-12 bg-transparent' viewBox="0 0 512 512" fill="#000000" aria-label="Discord" role="img" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="512" height="512" rx="15%" fill="transparent"></rect> <path d="m386 137c-24-11-49.5-19-76.3-23.7c-.5 0-1 0-1.2.6c-3.3 5.9-7 13.5-9.5 19.5c-29-4.3-57.5-4.3-85.7 0c-2.6-6.2-6.3-13.7-10-19.5c-.3-.4-.7-.7-1.2-.6c-23 4.6-52.4 13-76 23.7c-.2 0-.4.2-.5.4c-49 73-62 143-55 213c0 .3.2.7.5 1c32 23.6 63 38 93.6 47.3c.5 0 1 0 1.3-.4c7.2-9.8 13.6-20.2 19.2-31.2c.3-.6 0-1.4-.7-1.6c-10-4-20-8.6-29.3-14c-.7-.4-.8-1.5 0-2c2-1.5 4-3 5.8-4.5c.3-.3.8-.3 1.2-.2c61.4 28 128 28 188 0c.4-.2.9-.1 1.2.1c1.9 1.6 3.8 3.1 5.8 4.6c.7.5.6 1.6 0 2c-9.3 5.5-19 10-29.3 14c-.7.3-1 1-.6 1.7c5.6 11 12.1 21.3 19 31c.3.4.8.6 1.3.4c30.6-9.5 61.7-23.8 93.8-47.3c.3-.2.5-.5.5-1c7.8-80.9-13.1-151-55.4-213c0-.2-.3-.4-.5-.4Zm-192 171c-19 0-34-17-34-38c0-21 15-38 34-38c19 0 34 17 34 38c0 21-15 38-34 38zm125 0c-19 0-34-17-34-38c0-21 15-38 34-38c19 0 34 17 34 38c0 21-15 38-34 38z" fill="#5865f2"></path> </g></svg>
                <span className="sr-only">Discord page</span>
            </a>
            <a href="#" className="text-gray-100 hover:text-gray-50 dark:hover:text-white">
                 <svg className='h-7 w-8 mb-1' viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_874_1376)"><path d="M0.64209 78.8548V61.9927H2.66547V77.0243H11.4687V78.8548H0.64209Z" fill="#ABFE2C"></path><path d="M13.5249 78.8548V61.9927H23.9075V63.8232H15.5483V69.4639H22.3226V71.2944H15.5483V77.028H24.0276V78.8585L13.5249 78.8548Z" fill="#ABFE2C"></path><path d="M26.0015 78.8548V61.9927H30.2921L36.1693 77.5793H36.8462V61.9927H38.8478V78.8548H34.5554L28.7017 63.2482H28.0012V78.8566L26.0015 78.8548Z" fill="#ABFE2C"></path><path d="M47.408 79.1912C46.2825 79.2101 45.1659 78.9886 44.1328 78.5416C43.1948 78.1295 42.4019 77.4456 41.8565 76.5783C41.3033 75.7025 41.0261 74.6065 41.0249 73.2903V72.7845H43.0265V73.2903C43.0265 74.6878 43.4359 75.7273 44.2547 76.4091C45.0735 77.0908 46.1246 77.4347 47.408 77.4408C48.7242 77.4408 49.7274 77.1436 50.4176 76.5492C50.7485 76.2785 51.0137 75.9362 51.1934 75.5483C51.373 75.1603 51.4624 74.7367 51.4548 74.3093C51.4838 73.7707 51.3163 73.2399 50.9835 72.8154C50.6255 72.4113 50.1755 72.0993 49.6716 71.9056C49.0335 71.6481 48.3757 71.4424 47.7046 71.2906L46.4527 70.9776C45.5566 70.7512 44.685 70.4367 43.8507 70.0387C43.1466 69.7117 42.5373 69.2107 42.0803 68.583C41.6545 67.9765 41.4416 67.2014 41.4416 66.2576C41.4196 65.385 41.6682 64.527 42.153 63.8011C42.653 63.0892 43.3481 62.5369 44.1546 62.2108C45.0987 61.828 46.1111 61.6423 47.1296 61.6649C48.1831 61.6481 49.2287 61.8488 50.2011 62.2545C51.0608 62.6144 51.8005 63.2114 52.3337 63.9758C52.8565 64.74 53.1173 65.6996 53.1161 66.8544V67.8661H51.1145V66.8544C51.1145 66.0356 50.9423 65.3775 50.5978 64.8802C50.246 64.3765 49.7508 63.9904 49.1767 63.772C48.5197 63.5199 47.8205 63.3964 47.1169 63.4081C46.0094 63.4081 45.1178 63.6507 44.4421 64.1359C43.7664 64.6212 43.4292 65.3156 43.4304 66.2194C43.4067 66.7361 43.5594 67.2456 43.8635 67.6641C44.1908 68.0656 44.6138 68.3784 45.0935 68.5739C45.7076 68.8351 46.344 69.0403 46.995 69.1871L48.2487 69.5019C49.157 69.6866 50.0415 69.9735 50.8853 70.3571C51.6205 70.6829 52.2623 71.1878 52.7522 71.8255C53.218 72.4442 53.4509 73.2515 53.4509 74.2474C53.4716 75.1697 53.2115 76.0766 52.7049 76.8476C52.1788 77.609 51.4484 78.2063 50.5978 78.5708C49.5907 79.002 48.5033 79.2135 47.408 79.1912Z" fill="#ABFE2C"></path><path d="M27.065 39.9117C26.5301 39.9117 13.8348 39.8007 4.12361 30.0859C3.918 29.8821 3.71784 29.6747 3.52133 29.4673C1.48703 27.3238 0.522643 24.7727 0.726437 22.0925C0.908396 19.727 2.00015 17.4361 3.79245 15.6384C5.58474 13.8406 7.88289 12.7525 10.2465 12.5724C12.723 12.3904 15.0903 13.1947 17.1301 14.9233C17.3502 12.2594 18.4493 10.0104 20.3344 8.39458C22.1339 6.84974 24.5194 6 27.0668 6C29.6143 6 31.9998 6.84974 33.7993 8.39458C35.6826 10.0122 36.7835 12.2594 37.0036 14.9233C39.0434 13.1947 41.4107 12.3758 43.8871 12.5724C46.2526 12.7543 48.5435 13.8461 50.3394 15.6384C52.1353 17.4307 53.2271 19.7288 53.4054 22.0925C53.611 24.7727 52.6448 27.3238 50.6123 29.4709C50.4158 29.6783 50.2157 29.8858 50.0101 30.0896C40.2971 39.8007 27.6018 39.9117 27.065 39.9117ZM10.9489 14.5612C8.7472 14.5612 6.68014 15.5856 5.20991 17.054C2.56786 19.6979 1.36693 24.2796 4.977 28.0953C5.16139 28.2906 5.34941 28.4841 5.54108 28.6757C14.6718 37.8046 26.9449 37.9102 27.0668 37.9102C27.1888 37.9102 39.4874 37.7828 48.5944 28.6757C48.7873 28.4829 48.9753 28.2894 49.1585 28.0953C52.7686 24.2742 51.5676 19.6979 48.9256 17.054C46.2835 14.4101 41.7 13.2092 37.8788 16.8211C37.6835 17.0043 37.4901 17.1923 37.2984 17.3852C37.151 17.5326 37.0073 17.6836 36.8653 17.8346L34.9675 19.8471L35.0421 17.0849C35.0421 16.8739 35.0548 16.6646 35.0548 16.4517C35.0548 16.1788 35.0548 15.9059 35.0439 15.642C34.8984 10.3925 30.8097 7.99973 27.0705 7.99973C23.3312 7.99973 19.2462 10.3907 19.0988 15.642C19.0988 15.9095 19.0879 16.1879 19.0879 16.4517C19.0879 16.6592 19.0879 16.863 19.0988 17.0686L19.1735 19.8471L17.2738 17.8455C17.1301 17.6927 16.9845 17.5398 16.8353 17.3888C16.6424 17.1959 16.4489 17.0079 16.2548 16.8247C14.5535 15.2108 12.7066 14.5612 10.9489 14.5612Z" fill="#ABFE2C"></path><path d="M25.7818 29.3107H24.3261C24.3261 27.1435 22.2154 25.3785 19.6243 25.3785C17.0332 25.3785 14.9225 27.1435 14.9225 29.3107H13.4668C13.4668 26.3393 16.2289 23.9229 19.6243 23.9229C23.0196 23.9229 25.7818 26.3393 25.7818 29.3107Z" fill="#ABFE2C"></path><path d="M40.5821 29.2507H39.1264C39.1264 27.0836 37.0175 25.3204 34.4246 25.3204C31.8317 25.3204 29.7228 27.0836 29.7228 29.2507H28.2671C28.2671 26.2812 31.0292 23.8647 34.4246 23.8647C37.8199 23.8647 40.5821 26.2812 40.5821 29.2507Z" fill="#ABFE2C"></path><path d="M21.2999 29.3415C22.4566 29.3415 23.3943 28.4039 23.3943 27.2472C23.3943 26.0905 22.4566 25.1528 21.2999 25.1528C20.1432 25.1528 19.2056 26.0905 19.2056 27.2472C19.2056 28.4039 20.1432 29.3415 21.2999 29.3415Z" fill="#ABFE2C"></path><path d="M36.0026 29.3415C37.1592 29.3415 38.0969 28.4039 38.0969 27.2472C38.0969 26.0905 37.1592 25.1528 36.0026 25.1528C34.8459 25.1528 33.9082 26.0905 33.9082 27.2472C33.9082 28.4039 34.8459 29.3415 36.0026 29.3415Z" fill="#ABFE2C"></path><path d="M27.0593 34.662C25.3435 34.662 23.7531 33.7795 23.0107 32.4148L24.2845 31.7197C24.7776 32.6295 25.8639 33.2063 27.0557 33.2063C28.2475 33.2063 29.3356 32.6222 29.8269 31.7197L31.1006 32.4148C30.3655 33.7795 28.7807 34.662 27.0593 34.662Z" fill="#ABFE2C"></path><path d="M53.1464 54.8398C49.4988 56.5478 45.3872 56.9958 41.4573 56.1135C38.2045 55.3923 35.2183 53.7757 32.8361 51.4463C34.3442 52.0713 35.9619 52.3892 37.5943 52.3816C40.417 52.3822 43.1698 51.5046 45.4714 49.8705L44.3032 48.2438C41.1535 50.511 36.821 51.0569 33.402 49.5121C30.0285 47.9927 28.1252 44.7411 28.0033 40.3322V38.9111H26.0017V39.1622V40.3213C25.8853 44.7356 23.9783 47.9909 20.6012 49.5121C17.1822 51.0533 12.8425 50.5147 9.70002 48.2384L8.53366 49.8651C10.8337 51.4998 13.5852 52.3786 16.407 52.3797C18.0395 52.3877 19.6572 52.0698 21.1653 51.4445C18.7838 53.7738 15.7981 55.3905 12.5459 56.1117C8.61601 56.9941 4.50437 56.5461 0.856807 54.838L0.00341797 56.6485C2.68216 57.9059 5.60544 58.5564 8.56459 58.5536C10.0514 58.5541 11.5337 58.39 12.9844 58.0641C17.4358 57.0759 21.4123 54.5879 24.2476 51.0169L24.2604 51.0005C24.9257 50.1277 25.5098 49.1958 26.0054 48.2165V58.5172H28.0069V48.2311C28.5018 49.2055 29.084 50.1331 29.7465 51.0023L29.7592 51.0187C32.5942 54.5892 36.57 57.0772 41.0206 58.066C42.4713 58.3918 43.9536 58.556 45.4404 58.5554C48.4002 58.5582 51.324 57.9077 54.0034 56.6503L53.1464 54.8398Z" fill="#ABFE2C"></path></g><defs><clipPath id="clip0_874_1376"><rect width="54" height="73.193" fill="white" transform="translate(0 6)"></rect></clipPath></defs></svg>
                <span className="sr-only">Lens page</span>
            </a>
            </div>
      </div>
      
    </div>



  )
}

export default Hero