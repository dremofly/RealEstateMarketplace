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
            //console.log(count.toNumber());            
            assert.equal(count, 5, "The number of tokens should be 5")
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf(account_one);
            assert.equal(tokenBalance, 5, "The balance of account_one should be 5")
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenUri = await this.contract.tokenURI(1)
            console.log(tokenUri);
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "The token uri is right")
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 0, {from: account_one});
            let balance = await this.contract.balanceOf(account_two);

            assert.equal(balance, 1, "The balance of account_two should be 1 after transferfing.");                                          
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await HongToken.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_one, 0, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", {from: account_two});
            }
            catch(err) {
                console.log("error");
            }
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.contractOwner.call();
            console.log(owner);
        })

    });
})