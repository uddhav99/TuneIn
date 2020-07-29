const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const axios = require('axios');
const _ = require('lodash');
let multer = require('multer');
let upload = multer();

module.exports = (app, spotifyAPI) => {

    app.post('/api/search', upload.single('image'), requireLogin, async (req, res) => {
        const buffer = req.file.buffer;
        var arrByte = Uint8Array.from(buffer);
        const URI_BASE = keys.ComputerVisionEndpoint + 'vision/v3.0/analyze';
        var results;

        // making request to Microsoft Cognitive Services API
        try {
            results = await axios({
                method: 'post',
                url: URI_BASE,
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Ocp-Apim-Subscription-Key' : keys.ComputerVision
                }, 
                params: {
                    'visualFeatures': 'Tags',
                    'details': '',
                    'language': 'en'
                },
                data: arrByte
            });
        } catch (err) {
            console.log('microsoft error');
            return res.status(400).send('cognitive services error');
        }
        console.log(results['data']['tags']);

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
            playlist_id = await create_playlist(req, spotifyAPI);
            console.log('created');
        } catch(err) {
            if (err['statusCode'] === 401) {
                req.logout();
                console.log('authentication code reset');
                return res.status(401).send('reset authentication');
            }
            else {
                console.log('error - unable to create playlist');
            }
        }

        // searching for relevant songs and adding them to the playlist
        try {
            const id = await search_and_add(spotifyAPI, to_filter, playlist_id);
        } catch (err) {
            if (err['statusCode'] === 401) {
                req.logout();
                console.log('authentication code reset');
                return res.status(401).send('reset authentication');
            }
            else {
                console.log('error - track not found');
            }
        }
        console.log('200 worked');
        res.status(200).send('working');

    });
}

create_playlist = async (req, spotifyAPI) => {
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
search_and_add = async (spotifyAPI, to_filter, playlist_id) => {
    return Promise.all(to_filter.map(async (tag) => {
        const song_details = await spotifyAPI.searchTracks(tag.name, { limit: 1 });
        const song_uri = song_details['body']['tracks']['items'][0]['uri'];
        console.log(song_uri);
        const add_song = await spotifyAPI.addTracksToPlaylist(playlist_id, [song_uri]);
        console.log('added');
    })); 
};


// figure out how where to redirect once the searches are done and added to playlist 
// cant redirect on a post request, have to figure that out
// error handling and redirecting

/* 
    * can probably make the song searches more accurate 
    * right now if there is rock - it gives us songs that have rockstar as well
*/