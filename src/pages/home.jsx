import '../styles/home.css'

// Components
import Hero from '../components/hero'
import NftDetails from '../components/nftDetails'
import Footer from '../components/footer';


const Home = () => {

  return (
    <div className="home">
      <Hero />
      <NftDetails />
      <div className="mb-20"></div>
      <Footer />
    </div>
  )
}

export default Home