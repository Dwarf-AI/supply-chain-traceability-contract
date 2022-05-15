// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
 
import "./src/contracts/tokens/nf-token-metadata.sol";
import "./src/contracts/ownership/ownable.sol";
import "./Counters.sol";
 
contract DeCert is NFTokenMetadata, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
 
  constructor() {
    nftName = "Autify";
    nftSymbol = "AUTIFY";
  }
 
  function mint(address _to, string calldata _uri) external onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    super._mint(_to, tokenId);
    super._setTokenUri(tokenId, _uri);
  }
 
}