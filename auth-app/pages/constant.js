export const API_URL = "https://volta-rpc.energyweb.org/";
export const PRIVATE_KEY ="0d41a7bc9850c50a0a597ebfda0afc4c20d61a91c79b7a6e48107892d0f5fad9";
export const contractAddress = "0x7222Fa19668998941Ac4C82033AA5c517B95beA9";
export const contractAbi = 
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "fileName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "upload",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "fileName",
				"type": "string"
			}
		],
		"name": "getIPFSHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "fileName",
				"type": "string"
			}
		],
		"name": "isFileStored",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];