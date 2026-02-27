const mongoose= require('mongoose');
const review = require('./review.js');
const Schema=mongoose.Schema;

 const listingsSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
   image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        set: (v) =>
            v === "" 
            ? "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
            : v,
    }
},

    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review'
    },
],
owner:{
    type:Schema.Types.ObjectId,
    ref:'User',
}, 
geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
}
 });

 listingsSchema.post('findOneAndDelete', async (listings) => {
    if (listings) {
        await review.deleteMany({
            _id: {
                $in: listings.reviews
            }
        });
    }
  });

 const Listing= mongoose.model('Listing',listingsSchema);
 module.exports=Listing;