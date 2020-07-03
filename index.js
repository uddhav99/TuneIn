const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cookieSession = require('cookie-session')

require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});