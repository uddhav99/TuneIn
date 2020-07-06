const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const axios = require('axios');
const spotifyApi = require('../services/passport');

module.exports = (app, spotifyAPI) => {

    app.post('/api/vision', requireLogin, async (req, res) => {
        
    });

    app.get('/api/search', requireLogin, async (req, res) => {
        try {
            const first = await spotifyApi.searchTracks('Love', { limit: 1 });
            console.log(first.body);
            res.status(200).send(first.body);
        } catch (err) {
            res.status(400).send(err)
        }
    });
}