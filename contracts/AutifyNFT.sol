// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
 
import "./src/contracts/tokens/nf-token-metadata.sol";
import "./src/contracts/ownership/ownable.sol";
import "./Counters.sol";
 
contract AutifyNFT is NFTokenMetadata, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  mapping(uint256 => string[]) packageStageData; 
 
  constructor() {
    nftName = "Autify";
    nftSymbol = "AUTIFY";
  }
 
  function mint(address _to, string calldata _uri) external onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    super._mint(_to, tokenId);
    super._setTokenUri(tokenId, _uri);
    packageStageData[tokenId].push("created");
  }

  function updateStage(uint256 _tokenId, string memory _stageData) public onlyOwner {
    packageStageData[_tokenId].push(_stageData);
  }

  function getStageData(uint256 _tokenId) public view returns(string[] memory) {
    return packageStageData[_tokenId];
  }
 
}