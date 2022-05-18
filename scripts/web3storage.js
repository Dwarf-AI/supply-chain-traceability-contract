const { Web3Storage, getFilesFromPath } = require('web3.storage');
require('dotenv').config();
const { fs } = require('fs');
const { mime } = require('mime');
const { path } = require('path');

function getAccessToken () {
    return process.env.WEB3STORAGE_TOKEN
}
  
function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
}
async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

async function main(){
    const web3storage = new makeStorageClient();
    const file = await fileFromPath('./scripts/img.jpeg');
    const rootCid = await web3storage.put([file])
    console.log(rootCid);
}

main()

