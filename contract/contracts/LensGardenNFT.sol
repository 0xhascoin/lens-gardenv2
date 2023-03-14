// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract LensGardenNFT is ERC721URIStorage {
    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => bool) private minted;
    mapping(address => mapping(uint256 => bool)) private mintedNFTs;

    // We need to pass the name of our NFTs token and its symbol.
    constructor() ERC721("LensGarden", "LG") {
        console.log("This is my NFT contract. Woah!");
    }

    event NewNFTMinted(address sender, uint256 tokenId);

    // A function our user will hit to get their NFT.
    function makeAnEpicNFT(string memory _uri) public {
        require(
            !minted[msg.sender],
            "Address has already minted an NFT of this type"
        );

        // Get the current tokenId, this starts at 0.
        uint256 newItemId = _tokenIds.current();

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newItemId);

        // Return the NFT's metadata
        _setTokenURI(newItemId, _uri);

        minted[msg.sender] = true;

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();

        emit NewNFTMinted(msg.sender, newItemId);
    }

    function mintLevelNFT(string memory _uri, uint256 _typeId) public {
        require(_typeId <= 9, "must not be greater than 9");
        require(![mintedNFTs[msg.sender][_typeId]], "Address has already minted this level nft");

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, _uri);

        mintedNFTs[msg.sender][_typeId] = true;

        _tokenIds.increment();
    }
}
