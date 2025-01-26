const mongoose=require('mongoose');
const intiData=require('./data.js');
const Listing=require("../models/listing.js");
// const { db } = require('../models/listing.js');
main().
then(()=>{
  console.log("Connection success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    intiData.data=intiData.data.map((obj)=>({...obj,owner:"670630f0364c394fea289d1a"}));
    await Listing.insertMany(intiData.data);
    console.log("Data was initialized");
}
initDB();