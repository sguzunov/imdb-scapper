'use strict';

const _ = require('lodash');

const queuesFactory = require("../data-structures/queue");
const constants = require("../config/constants");

const moviesbyGenreUrlTemplate = `http://www.imdb.com/search/title?genres=<%= genre %>&title_type=feature&0sort=moviemeter,asc&page=<%= page %>&view=simple&ref_=adv_nxt`;

module.exports.generateMoviesUrls = function() {
    let urlsQueue = queuesFactory.getQueue();
    constants.genres.forEach(genre => {
        for (let i = 0; i < constants.pagesCount; i += 1) {
            let compiled = _.template(moviesbyGenreUrlTemplate);
            let page = i + 1;
            let url = compiled({ genre, page });
            urlsQueue.push(url);
        }
    });

    return urlsQueue;
}