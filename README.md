<p align="center">

<a href="https://dwarf-ai.com" target="_blank">
<img src="https://miro.medium.com/fit/c/176/176/1*uDAWoWlMD7pBnJ-IOmKtdw.jpeg" width = 205 height = 205/>
</a>
<hr>
</p>

As everything becomes more digital, there's a need to replicate the properties of physical items like scarcity, uniqueness, and proof of ownership. 

This repository digitalizes the physical products like shoes, cars etc. using blockchain technology

## Contract ([NFT.sol](https://github.com/autifynetwork/Authentication-contracts/blob/master/contracts/AutifyNFT.sol) )
This contract is extended ERC721.
1.  Ownership is managed through the uniqueID and metadata that no other token can replicate
2.  NFTs are minted through smart contracts that assign ownership and manage the transferability of the NFT's

NFTs give the ability to assign or claim ownership of any unique piece of digital data, trackable by using Ethereum's blockchain as a public ledger.

Following informations are stored in NFT metadata file:
- Brand name
- Product Id
- Images associated to the product
- Manufacturer Name
- Manufacturer Location
- Upload Date and time
- Description about the product

# Installation
Install the dependencies using:
```sh
npm install
```

## Deploying the contract
The contract can be deployed using the script at [deploy.js](https://github.com/autifynetwork/Authentication-contracts/blob/master/scripts/deploy.js) with command

```sh
node scripts/deploy.js
```

## Minting the NFT
The NFT can be minted using the script at [web3storage.js](https://github.com/autifynetwork/Authentication-contracts/blob/master/scripts/web3storage.js) with following modifications.
1. Change contract address `const contractAddress = "0x9a0CDaD1066D648F10FE96a2F92eaa87048bC71b";`
2. Make a `details.json` with product information 
3. Make a `.env` file with keys like `PVT_KEY`, `ROPSTEN` node url, `MUMBAI` node url, `PUBLIC_KEY`, `WEB3STORAGE_TOKEN`, `MORALIS_KEY`

```sh
node scripts/web3storage.js
```

## Retrieving information from the NFT
Details from the NFT can be retrieved using the script at [retrieve.js](https://github.com/autifynetwork/Authentication-contracts/blob/master/scripts/retrieve.js) with following changes:
1. Change contract address `const contractAddress = "0x9a0CDaD1066D648F10FE96a2F92eaa87048bC71b";` with deployed contract
2. Change chain `const chain="mumbai"`.
3. Enter the token id information `const tokenID = 4;`

```sh
node scripts/retrieve.js
```
