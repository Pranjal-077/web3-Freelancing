const hre = require("hardhat");

async function main() {
  const [client, freelancer] = await hre.ethers.getSigners();

  console.log("Client:", client.address);
  console.log("Freelancer:", freelancer.address);

  const Escrow = await hre.ethers.getContractFactory("Escrow");

  const escrow = await Escrow.deploy(
    freelancer.address,
    {
      value: hre.ethers.utils.parseEther("1"),
    }
  );

  await escrow.deployed();

  console.log("Escrow deployed to:", escrow.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
