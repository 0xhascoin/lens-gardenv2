import React from 'react';
import rmhor from '../styles/images/rmhor.jpeg';
import rmver from "../styles/images/rmver.jpeg";
import '../styles/home.css';

// Components
import Team from '../components/team';
import Footer from '../components/footer';

const Roadmap = () => {

    return (
        <div>
            {/* About the project */}

            {/* Roadmap */}
            <div className='flex sm:w-3/4 w-full justify-center items-center mx-auto mt-4 px-2 sm:px-0'>
                <img src={rmhor} className="dont-displaysm border-2 border-white rounded-lg mt-2 hover:border-green-500 cursor-pointer" />
                <img src={rmver} className="dont-displaymd border-2 border-white rounded-lg mt-2" />
            </div>

            {/* About the team */}
            <Team />

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Roadmap