import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import { useAccount } from 'wagmi'
import Connected from './Connected'


const Navbar = () => {
  const { setTheme } = useWeb3ModalTheme();

  setTheme({
    themeMode: "light",
    themeColor: "blackWhite",
    themeBackground: "themeColor",
  });

  const { isConnecting, isDisconnected } = useAccount()

  const renderConnect = () => {
    if (isConnecting || isDisconnected) {
      return <Web3Button />
    } 
    return <Connected />
    
  }

  // useEffect(() => {
    
  // }, [address])



  


  
  return (
    <div className="flex items-center justify-end">
      { renderConnect() }
    </div>
  )
}

export default Navbar;