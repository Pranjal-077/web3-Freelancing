import { ethers } from "ethers";
import { escrowAbi } from "../abi/escrowAbi";
import { ESCROW_ADDRESS } from "../config";

export async function getProviderAndSigner() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return null;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return { provider, signer };
}

export async function getEscrowContract() {
  const data = await getProviderAndSigner();
  if (!data) return null;

  return new ethers.Contract(
    ESCROW_ADDRESS,
    escrowAbi,
    data.signer
  );
}

export async function getEscrowBalance() {
  const data = await getProviderAndSigner();
  if (!data) return null;

  const balance = await data.provider.getBalance(ESCROW_ADDRESS);
  return ethers.utils.formatEther(balance);
}
