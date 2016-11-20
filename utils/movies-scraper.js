'use strict';

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");

const timeBetweenRequestsInMs = 1000;

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function getMoviesFromUrl(urls) {
    let url = urls.pop();
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const selector = ".col-title span[title] a";
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then(movies => {
            let dbMovies = movies.map(movie => {
                return modelsFactory.getSimpleMovie(movie.title, movie.url);
            });

            modelsFactory.insertManySimpleMovies(dbMovies);

            return wait(timeBetweenRequestsInMs);
        })
        .then(() => {
            if (urls.isEmpty()) {
                return;
            }

            getMoviesFromUrl(urls.pop());
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

module.exports.getMoviesFromUrls =
    function getMoviesFromUrls(asyncPagesCount, urls) {
        Array.from({ length: asyncPagesCount })
            .forEach(() => getMoviesFromUrl(urls));
    };