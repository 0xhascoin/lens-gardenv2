import React from 'react'
import { BsGlobe } from 'react-icons/bs'
import logo1 from '../styles/images/logo1.png';
const Footer = () => {
  return (
    
<footer class="p-4 bg-transparent mt-12 sm:p-6 shadow-xl shadow-black/40">
    <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
            <a href="https://flowbite.com/" class="flex items-center">
                <img src={logo1}class="h-10 mr-3 rounded-lg" alt="FlowBite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Lens Garden</span>
            </a>
        </div>
        <div class="flex justify-end text-right">
            <div>
                <h2 class="mb-6 text-lg font-semibold text-white">Pages</h2>
                <ul class="text-gray-100">
                    <li class="mb-4">
                        <a href="https://flowbite.com/" class="hover:underline">View Garden</a>
                    </li>
                    <li>
                        <a href="https://tailwindcss.com/" class="hover:underline">Mint NFT</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" class="hover:underline">Lens Garden</a>. All Rights Reserved.
        </span>
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="#" class="text-gray-100 hover:text-gray-50 dark:hover:text-white">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                <span class="sr-only">Twitter page</span>
            </a>
            <a href="#" class="text-gray-100 hover:text-gray-50 dark:hover:text-white">
                <BsGlobe class="w-5 h-5" />
                <span class="sr-only">Twitter page</span>
            </a>

        </div>
    </div>
</footer>

  )
}

export default Footer