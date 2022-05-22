require('dotenv').config();
//const { ethers } = require('ethers');
const axios = require('axios');

const contractAddress = "0xfb9DD578c6051fb345a5160141139C0e5ca282AE";


const tokenID = 3;

function getProductData(data){
    const datajson = JSON.parse(data.metadata);
    const imageURL = `https://cf-ipfs.com/ipfs/${datajson.image}`;
    console.log('Name :', datajson.name);
    console.log('Description :', datajson.description);
    console.log('Retailer :', datajson.data.retailer);
    console.log('Manufacturer :', datajson.data.manufacturer);
    console.log('Location :', datajson.data.location);
    console.log('Image URL :', imageURL);
}

async function main(){
    const res = await axios.get(`https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${tokenID}?chain=rinkeby&format=decimal`, {
        headers : {
            'X-API-Key': process.env.MORALIS_KEY,
        }
    })
    .catch(err => {
        console.log(err);
    });
    getProductData(res.data);
}

main()
  .catch(err => {
      console.error(err)
      process.exit(1)
})