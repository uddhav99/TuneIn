const passport = require('passport');

module.exports = (app) => {
    
    app.get(
        '/auth/spotify', 
        passport.authenticate('spotify', {
            scope: ['playlist-read-private','user-read-email', 'playlist-modify-private']
        })
    );

    app.get('/auth/spotify/callback', passport.authenticate('spotify'), (req, res) => {
        res.send(req.user);
    })
}