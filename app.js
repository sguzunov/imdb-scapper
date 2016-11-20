/* globals console, require, setTimeout, Promise */
'use strict';

const urlGenerator = require("./utils/url-generator");
const constants = require("./config/constants");
const moviesScraper = require("./utils/movies-scraper");

require("./config/mongoose")(constants.connectionString);

let urlsQueue = urlGenerator.generateMoviesUrls();
const asyncPagesCount = 15;

moviesScraper.getMoviesFromUrls(asyncPagesCount, urlsQueue);