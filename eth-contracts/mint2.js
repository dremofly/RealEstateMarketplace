// This file is the script used to mint tokens
const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')

var fs = require('fs')
var path = require('path')

var m = fs.readFileSync(".mnemonic").toString()
var link = fs.readFileSync(".infura").toString()

var file = path.join(__dirname, 'test/proof.json')
var json = fs.readFileSync(file, 'utf-8')
data = JSON.parse(json)
var input = data.inputs;
var proof = data.proof;

// contract and abi
const contract = require('./build/contracts/SolnSquareVerifier')
const abi = contract.abi
const address = "0x82EfdF9AaAd6e8B17ab316633b86336dE5897535"    // contract address
const owner = "0xaF2fBEC164115C9664E21E4DcA7702B880f99594"  // owner of this contract

async function main() {
    const provider = new HDWalletProvider(m, link)
    const instance = new web3(provider)

    const nftContract = await new instance.eth.Contract(abi, address, {from: owner, gasLimit: "1000000"})
    
    //console.log(nftContract.methods)

    
    for(let i=0; i<10; i++) {
        try {
            console.log("mint...")
            let result = await nftContract.methods.mint(owner, i, "").send({from:owner, gas:553000});
            let balance = await nftContract.methods.totalSupply().call({from:owner})
            console.log(balance)
            console.log("mint finished")
    
        } catch (e) {
           console.log(e)
        }
    }
}

main()






