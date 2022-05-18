const { Web3Storage, File } = require('web3.storage');


async function uploadJson(client, rootCid, body, now, fileName){
    const jsonToUpload = {
        name: body.name,
        description: body.description,
        validFrom: body.validFrom,
        validTo: body.validTo,
        image: `ipfs://${rootCid}/${fileName}.png`
    };
    const files = [new File([JSON.stringify(jsonToUpload)], `${now}.json`)];
    await Promise.all([
        client.put(files, {
            name: `Json ${now}`,
            onRootCidReady: (rootCid) => {
                callContract(rootCid, now, body.type, body.recieversAddress);
            }
        }),
        saveCertifiate.save()
    ]).catch((err) => {
        console.log(err)
    })
    
}

/**
 * 
 * @param {json} body 
 */
async function uploadCertificate(body){
    const fileName = uid();
    const now = new Date()
    const client = makeStorageClient();
    const binary = Buffer.from(body.image);
    const files = [new File([binary], `${fileName}.png`)];
    await client.put(files, {
        name: `Image ${now}`,
        onRootCidReady: (rootCid) => {
            uploadJson(client, rootCid, body, now, fileName);
        },
    }).catch((err) => {
        console.log(err);
    })
};