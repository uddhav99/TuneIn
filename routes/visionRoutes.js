const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const axios = require('axios');
const _ = require('lodash');

module.exports = (app, spotifyAPI) => {

    app.get('/api/search', requireLogin, async (req, res) => {

        const URI_BASE = keys.ComputerVisionEndpoint + 'vision/v3.0/analyze';
        const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg"; // will be sent as req body
        var results;
        try {
            results = await axios({
                method: 'post',
                url: URI_BASE,
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key' : keys.ComputerVision
                }, 
                params: {
                    'visualFeatures': 'Tags',
                    'details': '',
                    'language': 'en'
                },
                data: {
                "url": imageUrl,
                }
            });
        } catch (err) {
            res.status(400).send(err);
        }

        // remove the common ones - indoor, outdoor, ground, wall, person, woman, man, ceiling, floor
        const to_filter = results['data']['tags'];
        _.remove(to_filter, (item) => {
            return (item.name === 'indoor' || item.name === 'outdoor' || item.name === 'ground' || item.name === 'wall'
                || item.name === 'person' || item.name === 'woman' || item.name === 'man' || item.name === 'ceiling'
                || item.name === 'floor'
            );
        });

        search_and_add(req, res, to_filter);
    });

    search_and_add = async (req, res, to_filter) => {
        if (to_filter.length > 0) {
            try {
                const first = await spotifyAPI.searchTracks(to_filter[0].name, { limit: 1 });
                console.log(first.body['tracks']['items'][0]['id']);
            } catch (err) {
                if (err['statusCode'] === 401) {
                    req.logout();
                    res.redirect('/');
                }
                // add for 400 error
            }
        }
        if (to_filter.length > 1) {
            try {
                const second = await spotifyAPI.searchTracks(to_filter[1].name, { limit: 1 });
                console.log(second.body['tracks']['items'][0]['id']);
            } catch (err) {
                if (err['statusCode'] === 401) {
                    req.logout();
                    res.redirect('/');
                }
                // add for 400 error
            }
        }
        if (to_filter.length > 2) {
            try {
                const third = await spotifyAPI.searchTracks(to_filter[2].name, { limit: 1 });
                console.log(third.body['tracks']['items'][0]['id']);
            } catch (err) {
                if (err['statusCode'] === 401) {
                    req.logout();
                    res.redirect('/');
                }
                // add for 400 error
            }
        }
    }
}

// maybe something like this 
// leave the sizes - if size is not 3 add 3 random songs in the catch block
// then at the end, redirect to the specific page 


// or can just do map and then search songs and add them into the playlist - so we will only search 
// and add when the to_filter has some values

// figure out whether search_and_add will go inside module.exports or outside


// maybe create a new function for removing items as well?

