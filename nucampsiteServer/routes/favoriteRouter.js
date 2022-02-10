const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Favorite = require("../models/favorite");
const Verify = require("./verify");

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    Favorite.find({ postedBy: req.decoded._doc._id })
      .populate("postedBy dishes")
      .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
      });
  })

  .post(function (req, res, next) {
    const dishId = req.body._id;
    const userId = req.decoded._doc._id;

    const favoriteDishesData = {
      postedBy: userId,
      dishes: [dishId],
    };

    Favorite.findOne({ postedBy: userId }, function (err, favorite) {
      if (err) throw err;
      if (!favorite || favorite.length === 0) {
        Favorite.create(favoriteDishesData, function (err, favores) {
          if (err) throw err;
          console.log("A favorate dish has been created!");
          res.json(favores);
        });
      } else {
        if (favorite.dishes.indexOf(dishId) > -1) {
          res.json("This is allreayd in the favorite list!");
        } else {
          favorite.dishes.push(dishId);
          favorite.save(function (err, favores) {
            if (err) throw err;
            console.log("Added favorite dish!");
            res.json(favores);
          });
        }
      }
    });
  })
  // Delete ALL favorites after verifying the user
  .delete(function (req, res, next) {
    Favorite.remove({ postedBy: req.decoded._doc._id }, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

// Delete the individual favorites
favoriteRouter
  .route("/:dishId")
  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    const dishId = req.params.dishId;
    Favorite.findOne(
      { postedBy: req.decoded._doc._id, dishes: dishId },
      function (err, favores) {
        if (err) throw err;
        fav.dishes.remove(dishId);
        fav.save(function (err, favores) {
          if (err) throw err;
          console.log("Removed favorite from list!");
          res.json(fav);
        });
      }
    );
  });

module.exports = favoriteRouter;
