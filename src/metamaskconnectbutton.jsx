import { useWeb3React } from '@web3-react/core';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useState } from 'react';

const MetaMaskConnectButton = () => {
  const { activate, deactivate, active, account } = useWeb3React();
  const [connecting, setConnecting] = useState(false);

  const connectToMetaMask = async () => {
    const connector = new MetaMaskConnector();
    try {
      setConnecting(true);
      await activate(connector);
      setConnecting(false);
    } catch (err) {
      console.error(err);
      setConnecting(false);
    }
  };

  const disconnectFromMetaMask = async () => {
    try {
      await deactivate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {active ? (
        <div>
          <p>Connected to MetaMask</p>
          <p>Account: {account}</p>
          <button onClick={disconnectFromMetaMask}>Disconnect from MetaMask</button>
        </div>
      ) : (
        <button onClick={connectToMetaMask} disabled={connecting}>
          {connecting ? 'Connecting...' : 'Connect to MetaMask'}
        </button>
      )}
    </div>
  );
};
export default MetaMaskConnectButton;