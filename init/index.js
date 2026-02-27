const mongoose=require('mongoose');
const initdata=require("./data.js");
const Listing=require('../models/listing.js');

main()
.then(() =>{
    console.log("Connected to MongoDB");
})
.catch((err )=> {
    console.log("Error connecting to MongoDB:", err);       
});

async function main() {
     await mongoose.connect('mongodb://127.0.0.1:27017/listingsDB');
    }

const initDB= async () =>{
    await Listing.deleteMany({});
    initdata.data = initData.data.map((obj) =>({...obj,owner:"699b2322d3bf65879fc5c8f2"}));
    await Listing.insertMany(initdata.data);
    console.log("Database initialized with sample data");
}

initDB();