const { Web3Storage, File } = require('web3.storage');
require('dotenv').config();
const fs = require('fs');
const mime = require('mime');
const path = require('path');



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
    const jsonCid = await web3storage.put([jsonfile]);
    console.log(imageCid,jsonCid);
}

main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  })

