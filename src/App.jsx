import './App.css';

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Pages
import Home from './pages/home';
import Garden from './pages/garden';
import Roadmap from './pages/roadmap';

// Components
import Header from './components/header';

export default function App() {
  const projectId = "8abf723f4951e5e53259ff993a3fccb0"



  const chains = [goerli];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: projectId }),
  ]);
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: projectId,
      version: "1", // or "2"
      appName: "web3Modal",
      chains,
    }),
    provider,
  });


  
  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

     
  return (
    <Router>
      <WagmiConfig client={wagmiClient}>
        <div className="page">    
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/garden" element={<Garden />} /> 
            <Route path="/roadmap" element={<Roadmap />} /> 
          </Routes>
        </div>
      </WagmiConfig>
      
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </Router>
  )
}
