const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
// const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require('../middleware.js'); 
const listingController=require('../controller/listings.js');
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


//All listings-index and create listing
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync
    (listingController.createListing)
);

  
//New route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//show, Update and delete routes
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

  
//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  

module.exports=router;
  