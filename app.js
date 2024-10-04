const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../major project/models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //it help to create template or layouts

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); //connect static files

app.get("/", (req, res) => {
  // res.send("Hii, I am root");
  res.render("listings/home.ejs");
});

// let Listing = mongoose.model
// let sampleListing = new Listing({
//     tile: "God",
//     description: "Ganpati Bappa Morya",
//     price:1200,
//     location: "Calanguta, Goa",
//     country: "India",
// });

//index  route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//create routes
app.post("/listings", async (req, res, next) => {
  // let {title,description,image,price,country,location}=req.body;
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
  //  let listing = req.body.listing;
  //  console.log(listing);
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listings = await Listing.findById(id);
  res.render("listings/show.ejs", { listings });
});

//edit routes
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listings = await Listing.findById(id);
  res.render("listings/edit.ejs", { listings });
});

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  // console.log("I m live")
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings");
  //  console.log("I m live");
});

//Delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// app.get("/testListing",async (req,res) =>{

//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price:1200,
//          location: "Calanguta, Goa",
//         country: "India",
//     });

//   await  sampleListing.save();
//    console.log("Sample was save");
//    res.send("successful testing");
// });

app.use((err, req, res, next) => {
  res.send("Something went wrong");
});

app.listen(8000, () => {
  console.log("server is listening to port 8000");
});
