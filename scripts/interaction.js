// file web3
// ini dari soliditynya
const contract = require('../artifacts/contracts/Xyrait.sol/Xyrait.json');
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// ini dari web3 nyaa
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

// gabungan dari soliditinya dengan web3
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
// untuk mengakses ke solidity kita didalamnya ada method seperti mint(), balanceOf(), dsb ...

// kita buat akun untuk dapat melakukan tx
const PUBLIC_KEY = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const PRIVATE_KEY =
	'0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

// kita buatkan function untuk melakukan interaksi
async function mintNFT() {
	// untuk melakukan mint ini kita perlu banyak menggunakan web3nya web3.eth
	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

	const tx = {
		from: PUBLIC_KEY,
		to: contractAddress,
		nonce: nonce,
		gas: 1000000, // gas ini minimal nya 100.000 sudah perna coba yang 10.000 dannn error
		data: nftContract.methods.mint(5).encodeABI(),
		// untuk datanya ini perlu untuk ke soliditinmya (yaa karna kan kita minting ke soliditinya)
	};

	// ini untuk memberikan semacam ttd ke contrakc ini kita perlu untuk menggukana account
	const signTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

	// lalu, tentu saja kita perlu untuk mengirimnya
	const sendSignTx = await web3.eth.sendSignedTransaction(
		signTx.rawTransaction
	);

	console.log(`Transaction Receipt: ${JSON.stringify(sendSignTx)}`);
}

async function getBalanceNFT() {
	// untuk melihat balance NFT kita pada akunt kita kita tentu perlu untuk melihat pada solidity kita maka
	// kita perlu untuk melakukan nftContract balanceOf dan call()
	const balance = await nftContract.methods.balanceOf(PUBLIC_KEY).call();

	console.log(`Total NFT from address ${PUBLIC_KEY} : ${balance}`);
}

async function setBaseURI() {
	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

	const tx = {
		from: PUBLIC_KEY,
		to: contractAddress,
		nonce: nonce,
		gas: 100000,
		// setBaseURI ini datang dari solidity kita string calldata baseURI_
		data: nftContract.methods
			.setBaseURI('https://alexsiraitnotes.vercel.app/')
			.encodeABI(),
	};

	// sebenarnya hampir sama saja semua cuma bedanya di data tx nya sajaa :)
	const signTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
	const sendSignTx = await web3.eth.sendSignedTransaction(
		signTx.rawTransaction
	);

	console.log(`Base URI has been set to: ${sendSignTx}`);
}

async function getBaseURI() {
	// tokenURI ini digunakan untuk mengambil baseURI kita dari nftContract
	const baseURI = await nftContract.methods.tokenURI(1).call();

	console.log(`URI is : ${baseURI}`);
}

mintNFT();
// getBalanceNFT();
// setBaseURI();
// getBaseURI();
