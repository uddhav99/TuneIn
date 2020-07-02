const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});