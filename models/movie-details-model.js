/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ActorInMovieSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    }
});

let MovieDetailsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    releaseData: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    actors: [ActorInMovieSchema]
});

let MovieDetails;

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;