import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import { useAccount } from 'wagmi'

// Components
import Connected from './Connected'


const Navbar = () => {
  const { setTheme } = useWeb3ModalTheme();

  setTheme({
    themeMode: "light",
    themeColor: "teal",
    themeBackground: "themeColor",
  });

  const { isConnecting, isDisconnected } = useAccount()

  const renderConnect = () => {
    if (isConnecting || isDisconnected) {
      return <Web3Button />
    } 
    return <Connected />
    
  }

  return (
    <>
      { renderConnect() }
    </>
  )
}

export default Navbar;