pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './ERC721Mintable.sol';
import './SquareVerifier.sol';
import 'openzeppelin-solidity/contracts/utils/Address.sol';

contract verifier is SquareVerifier {
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is HongToken {

// TODO define a solutions struct that can hold an index & an address
    struct solutions {
        uint256 index;
        address ad;
    }


// TODO define an array of the above struct
    solutions[] public sols;

// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => solutions) private submitted;


// TODO Create an event to emit when a solution is added
    event solutionAdded();



// TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
                        address ad, 
                        uint256 index, 
                        uint[2] memory a, 
                        uint[2][2] memory b,
                        uint[2] memory c,
                        uint[2] memory input
                        ) 
                        public 
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(!isDuplicated(key), "This solution has existed");
        solutions memory sol = solutions({index: index, ad: ad});
        submitted[key] = sol;
        sols.push(sol);
        emit solutionAdded();
    }

    function isDuplicated(bytes32 key) internal returns(bool) {
        if(submitted[key].ad == address(0)) 
            return false;
        else 
            return true;
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address to, 
                    uint256 tokenId,
                    uint[2] memory a, 
                    uint[2][2] memory b,
                    uint[2] memory c,
                    uint[2] memory input 
                    ) 
                    public 
    {
        addSolution(to, tokenId, a, b, c, input);
        super.mint(to, tokenId, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");
    }
}


























