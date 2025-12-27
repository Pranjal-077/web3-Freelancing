import { ethers } from "ethers";

export default function Wallet({ setAddress }) {
  const connect = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    setAddress(addr);
  };

  return <button onClick={connect}>Connect Wallet</button>;
}
