import { useEffect, useState } from "react";
import {
  getEscrowContract,
  getEscrowBalance
} from "./hooks/useEscrow";

function App() {
  const [balance, setBalance] = useState("0");
  const [client, setClient] = useState("");
  const [freelancer] = useState("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");

  const jobTitle = "Build a Landing Page";

  const loadBalance = async () => {
    const bal = await getEscrowBalance();
    if (bal) setBalance(bal);
  };

  const loadClient = async () => {
    if (!window.ethereum) return;
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setClient(accounts[0]);
  };

  const releaseFunds = async () => {
    const escrow = await getEscrowContract();
    if (!escrow) return;

    const tx = await escrow.release();
    await tx.wait();

    alert("Payment released to freelancer 💸");
    loadBalance();
  };

  const refundFunds = async () => {
    const escrow = await getEscrowContract();
    if (!escrow) return;

    const tx = await escrow.refund();
    await tx.wait();

    alert("Job cancelled, funds refunded 🔁");
    loadBalance();
  };

  useEffect(() => {
    loadClient();
    loadBalance();
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "600px" }}>
      <h1>Web3 Freelancing Escrow</h1>

      <h3>Job</h3>
      <p><b>Title:</b> {jobTitle}</p>

      <h3>Participants</h3>
      <p><b>Client:</b> {client}</p>
      <p><b>Freelancer:</b> {freelancer}</p>

      <h3>Escrow</h3>
      <p><b>Payment Locked:</b> {balance} ETH</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={releaseFunds} style={{ marginRight: "10px" }}>
          Pay Freelancer
        </button>

        <button onClick={refundFunds}>
          Cancel Job
        </button>
      </div>
    </div>
  );
}

export default App;
