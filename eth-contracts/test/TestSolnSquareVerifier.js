var SolnSquareVerifier = artifacts.require('SolnSquareVerifier')
var fs = require('fs')
var path = require('path')
require('bignumber.js')

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
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('mint a token', async function () {
            try {
                await this.contract.mintNFT(ad, 2, proof.a, proof.b, proof.c, input)
            } catch (e) {
                console.log("mint error")
            }
            
            let balance = await this.contract.balanceOf(ad)
            console.log(balance)
            assert.equal(balance.toNumber(), 1, "The balance should be 1")
        })
// Test if a new solution can be added for contract - SolnSquareVerifier    
        it('add a new solution', async function () {
            await this.contract.addSolution(ad, 0, proof.a, proof.b, proof.c, input)
            console.log("add one")
            try{        
                await this.contract.addSolution(ad, 1, proof.a, proof.b, proof.c, input)
                console.log("add two")
                assert.fail("Failed to prevent to add two same solutions")
            } catch(e) {
                console.log("error")    
                assert.ok("Successfully prevent to add two same solutions")
            }
            
        }) 
    })

})

