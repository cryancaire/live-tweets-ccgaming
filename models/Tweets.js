const mongoose = require('mongoose');

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newDate = year + "-" + month + "-" + day;

const tweetSchema = new mongoose.Schema({
    'name': {
        type: String,
        require: true
    },
    'text': {
        type: String,
        require: true
    },
    'tweetedDate': {
        type: String,
        required: true,
        default: newDate
    },
    'tweet_url': {
        type: String,
        require: false
    },
});

module.exports = mongoose.model('Tweets', tweetSchema);