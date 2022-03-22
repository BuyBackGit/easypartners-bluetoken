console.log('Hello World');


const ADDRESS = "0xc8944F4c0Cb3346563fE273455f7B264393fC546"; // SMARTCONTRACT
const abicreateaddress = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "targetbuy",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "easyaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "token_to_buy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "promoter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "easyswap_address",
				"type": "address"
			}
		],
		"name": "Token_Created",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "children",
		"outputs": [
			{
				"internalType": "contract GET_TOKEN",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_defaultContract2",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_promoter",
				"type": "address"
			}
		],
		"name": "createSwap",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];



(async () => {
  if (window.ethereum) {
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('wallet-address').textContent = account;
  }


})();







getCreateButton = async () => {
   
    
    console.log('Getting Address for Easy Swap Factory');
    let addresstocreate = String(document.querySelector('#addressToCreate').value); 
    let promoteraddress = String(document.querySelector('#promoteraddress').value);
    
    alert('You will Create a Easy Swap for - ( ' + addresstocreate + ' ) And collected fees will go to - (' + promoteraddress + ' ) Service Cost = 0.01 BNB + Transaction Fee');   
    contractInstance = new web3.eth.Contract(abicreateaddress, ADDRESS)    
    console.log(addresstocreate, promoteraddress);   
    const receipt = await contractInstance.methods.createSwap(addresstocreate, promoteraddress).send({from: ethereum.selectedAddress, value: 10000000000000000 }); //10000000000000000 = 0.01 BNB FEE FOR DEPLOYMENT
    console.log('processing');              

    //This will print on console all the necessary data.

    console.log(receipt.events);   
           
    //Get TokenAddress from console and create a pop up with the value for user copy 

    
    const contract_address = await receipt.events.Token_Created.returnValues['easyaddress'];

    console.log(contract_address);

    console.log('Create Alert with Contract address');

    alert('Please Copy the New Easy Swap Address Contract - ' + contract_address);

    document.getElementById('neweasy-address').textContent = (contract_address);

}


if(document.querySelector('#CreateButton') != null){
    document.querySelector('#CreateButton').onclick = getCreateButton;    
}
