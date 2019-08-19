var SolnSquareVerifier = artifacts.require('SolnSquareVerifier')
var fs = require('fs')
var path = require('path')

contract('Test Solution SquareVerifier', accounts => {
    const account_one = accounts[0];
    const ad = accounts[1];
    const ad2 = accounts[2];
    var file = path.join(__dirname, 'proof.json')
    var json = fs.readFileSync(file, 'utf-8')
    data = JSON.parse(json)
    var input = data.inputs;
    var proof = data.proof;
    describe('Test SolnSquareVerifier', function () {
        beforeEach(async function () {
            this.contract = await SolnSquareVerifier.new({from: account_one})
        })
// Test if a new solution can be added for contract - SolnSquareVerifier    
        it('add a new solution', async function () {
            await this.contract.addSolution(ad, 0, proof.a, proof.b, proof.c, input)
        }) 
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('mint a token', async function () {
            await this.contract.mintNFT(ad2, 1, proof.a, proof.b, proof.c, input)

        })
    })

})

