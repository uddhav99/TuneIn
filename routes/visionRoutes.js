const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const axios = require('axios');
const _ = require('lodash');
const spotifyApi = require('../services/passport');

module.exports = (app, spotifyAPI) => {

    app.post('/api/vision', requireLogin, async (req, res) => {
        
    });

    app.post('/api/search', requireLogin, async (req, res) => {

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
        console.log(results['data']['tags']);

        // if after removing, size is not 3, then have to add random songs


        // try {
        //     const first = await spotifyApi.searchTracks('Love', { limit: 1 });
        //     // console.log(first.body);
        //     // res.status(200).send(first.body);
        // } catch (err) {
        //     res.status(400).send(err)
        // }
    });
}