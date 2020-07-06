const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: keys.spotifyClientId,
  clientSecret: keys.spotifySecret,
  redirectUri: keys.spotifyRedirect
});

passport.serializeUser( (user, done) => {
    done(null, user);
  });
  
passport.deserializeUser( (obj, done) => {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientId,
      clientSecret: keys.spotifySecret,
      callbackURL: '/auth/spotify/callback',
      proxy: true
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);
        // console.log(spotifyApi);
        return done(null, profile);
      });
    }
  )
);

module.exports = spotifyApi;