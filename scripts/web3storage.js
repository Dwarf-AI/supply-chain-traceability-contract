const { Web3Storage, File } = require('web3.storage');
require('dotenv').config();
const fs = require('fs');
const { ethers } = require('ethers');

const contractAddress = "0x2224e9DFcF8816148b120bEEF0944F6846e77d43";
const artifact = require("../artifacts/contracts/AutifyNFT.sol/AutifyNFT.json")
const providerOrUrl = {
    kovan: process.env.KOVAN,
    mumbai: process.env.MUMBAI,
    rinkeby : process.env.RINKEBY
}

async function callContract(cid, type, recieversAddress) {
    let provider = new ethers.providers.JsonRpcProvider(providerOrUrl[type]);
    const signer = new ethers.Wallet(process.env.PVT_KEY, provider);
    const contract_write = new ethers.Contract(contractAddress, artifact.abi, signer);
    await contract_write.mintNFT(recieversAddress, `ipfs://${cid}/metadata.json`).catch(err => {
        console.log(err);
    });
}

function getAccessToken () {
    return process.env.WEB3STORAGE_TOKEN
}
  
function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
}

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    return new File([content], 'image')
}

async function main(){
    const web3storage = new makeStorageClient();
    const file = await fileFromPath('./scripts/img.jpeg');
    const imageCid = await web3storage.put([file]);
    const jsonToUpload = {
        name: 'autify NFT',
        description: 'autify product',
        data : {
            retailer : 'bata',
            manufacturer : 'nike',
            location : 'pune' 
        },
        image: `${imageCid}/image`
    };
    const jsonfile = new File([JSON.stringify(jsonToUpload)], 'metadata.json');
    const jsonCid = await web3storage.put(
        [jsonfile],
        {
            onRootCidReady : (rootCid) => {
                callContract(rootCid, 'rinkeby', "0xF8FD64b9E74076FC2833c7de85fac6204390FA4A");
            }
        }
    );
    console.log(imageCid,jsonCid);
}

main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  })

