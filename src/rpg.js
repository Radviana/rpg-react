// importa o web3
import web3 from "./web3";
// Endereço do contrato gerado no deploy
const address = "0x3A1C752F7a3391C26e468021c32007272Af574cd";
// Abi gerada no deploy do contrato
const abi = [
	{
		inputs: [],
		stateMutability: "payable",
		type: "constructor"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "faces",
				type: "uint256"
			}
		],
		name: "Dado",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [],
		name: "Mostra_Resultado",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "gerente",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "getJogadores",
		outputs: [
			{
				internalType: "address payable[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "jogadores",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

//exporte o contrato
export default new web3.eth.Contract(abi, address);