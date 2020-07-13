const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const axios = require('axios');
const _ = require('lodash');

module.exports = (app, spotifyAPI) => {

    app.get('/api/search', requireLogin, async (req, res) => {

        const URI_BASE = keys.ComputerVisionEndpoint + 'vision/v3.0/analyze';
        const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg"; // will be sent as req body
        var results;

        // making API call to microsoft cognitive services API 
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
            return res.status(400).send(err);
        }

        // remove the common ones - indoor, outdoor, ground, wall, person, woman, man, ceiling, floor
        const to_filter = results['data']['tags'];
        _.remove(to_filter, (item) => {
            return (item.name === 'indoor' || item.name === 'outdoor' || item.name === 'ground' || item.name === 'wall'
                || item.name === 'person' || item.name === 'woman' || item.name === 'man' || item.name === 'ceiling'
                || item.name === 'floor'
            );
        });
        console.log(to_filter); // checking tags

        // creating playlist and getting the playlist ID
        var playlist_id = 0;
        try {
            playlist_id = await create_playlist(req, res, spotifyAPI);
            console.log('created');
        } catch(err) {
            if (err['statusCode'] === 401) {
                req.logout();
                return res.redirect('/');
            }
            else {
                return res.status(400).send(err);
            }
        }

        // searching for relevant songs and adding them to the playlist
        try {
            const id = await search_and_add(req, res, spotifyAPI, to_filter, playlist_id);
            console.log(id);
        } catch (err) {
            if (err['statusCode'] === 401) {
                req.logout();
                return res.redirect('/');
            }
            else {
                return res.status(400).send(err);
            }
        }

    });
}

// can clean up res
create_playlist = async (req, res, spotifyAPI) => {
    try {
        const playlist = await spotifyAPI.createPlaylist(req.user.id, 'TuneIn Playlist', { 'public' : false });
        const playlist_id = playlist['body']['id'];
        return playlist_id;
    } catch (err) {
        throw err;
    }
};

/* 
  * @returns If all the promises were successful or not 
*/
// can clean up req and res
search_and_add = async (req, res, spotifyAPI, to_filter, playlist_id) => {
    return Promise.all(to_filter.map(async (tag) => {
        const song_details = await spotifyAPI.searchTracks(tag.name, { limit: 1 });
        const song_uri = song_details['body']['tracks']['items'][0]['uri'];
        console.log(song_uri);
        const add_song = await spotifyAPI.addTracksToPlaylist(playlist_id, [song_uri]);
        console.log('added');
    })); 
};




// have to pass in image URL in req.body
// have to change to app.get to app.post
// figure out how where to redirect once the searches are done and added to playlist 

/* 
    * can probably make the song searches more accurate 
    * right now if there is rock - it gives us songs that have rockstar as well
*/