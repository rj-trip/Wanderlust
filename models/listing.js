// const mongoose=require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required:true,
//     },
//     description: String,
//     image : {
//         type:String,
//         set:(v)=>
//         ( v=== ""
//          ? "https://cdn.wallpapersafari.com/69/15/fGoZWE.jpg"
//          :v),
//     },
//     price: Number,
//     location: String,
//     country: String,
// })

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default:" https://tse1.mm.bing.net/th?id=OIP.Rn96Bdd7LVgpaMBPHpIjLwHaEo&pid=Api&P=0&h=180",
        set: (v) => (v === "" ? "https://tse1.mm.bing.net/th?id=OIP.Rn96Bdd7LVgpaMBPHpIjLwHaEo&pid=Api&P=0&h=180" : v),
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports =Listing;//<---------ye export hoke kaha jayega +
