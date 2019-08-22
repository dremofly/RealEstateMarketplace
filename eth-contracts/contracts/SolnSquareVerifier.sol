pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';
import './SquareVerifier.sol';
import 'openzeppelin-solidity/contracts/utils/Address.sol';

contract verifier is SquareVerifier {
}

contract SolnSquareVerifier is HongToken {

    struct solutions {
        uint256 index;
        address ad;
    }


    solutions[] public sols;

    mapping(bytes32 => solutions) private submitted;


    event solutionAdded();



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
        // TODO: add a check to ensure that solution is added
        super.mint(to, tokenId, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");
    }
}


























