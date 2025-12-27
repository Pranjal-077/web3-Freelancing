const hre = require("hardhat");

async function main() {
  const [client, freelancer] = await hre.ethers.getSigners();

  // 👇 replace with your deployed contract address
  const ESCROW_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = Escrow.attach(ESCROW_ADDRESS);

  console.log("Client balance before:", await hre.ethers.provider.getBalance(client.address));

  // 🔥 Release funds
  const tx = await escrow.connect(client).release();
  await tx.wait();

  console.log("Funds released!");

  console.log("Freelancer balance after:", await hre.ethers.provider.getBalance(freelancer.address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
