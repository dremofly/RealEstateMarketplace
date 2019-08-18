var HongToken = artifacts.require('HongToken');
require('bignumber.js')

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await HongToken.new({from: account_one});  // an instance

            // TODO: mint multiple tokens
            for(let i=0; i<5; i++) {
                await this.contract.mint(account_one, i, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");
            }
            
            
        })

        it('should return total supply', async function () { 
            let count = await this.contract.totalSupply.call();
            console.log(count.toNumber());            
        })

        it('should get token balance', async function () { 
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await HongToken.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})