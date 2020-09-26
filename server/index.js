require('dotenv').config();
const express = require('express');
var cors = require('cors')
const googleService = require('./googleService');
const app = express();
app.use(cors());

app.get('/getuserData', function(req, res, next) {
    googleService.getToken(req.query.code).then(userData => {
        res.json({
            userData
        })
    })
})
console.log('Get google url for frontend', googleService.urlGoogle());
// give this url to frontend

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
