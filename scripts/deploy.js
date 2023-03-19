// file ini untuk kita dapat melakukan deploy dan kemudian mendapatkan contract address
// kita disini menggunakan hardhat
const hre = require('hardhat');

async function deploy() {
	const Sirait = await hre.ethers.getContractFactory('Xyrait');
	const sirait = await Sirait.deploy();

	await sirait.deployed();

	console.log('Sirait deployed to: ' + sirait.address);
}

deploy()
	.then(() => process.exit(0))
	.catch((e) => {
		console.log(e);
		process.exit(1);
	});
