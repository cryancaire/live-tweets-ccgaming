require('dotenv').config()
const Twitter = require('twitter-v2');
const socketio = require('socket.io');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const Tweets = require('./models/Tweets');
const express = require('express');
const app = express();

const mongoURL = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB;

app.set('view engine', 'ejs');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 1234;

const server = app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

mongoose.connect(`${mongoURL}/${dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB')
});

const io = socketio(server);

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

getTweets();

async function getTweets () {
    const rules ={
        "add": [
            //set your own rules
            { "value": "#CCGaming"},
            { "value": "#ccgaming"},
            { "value": "@cryancaire"},
        ]
    };
    try {
        const params =  {
            expansions: 'author_id',
            'user.fields': 'username'
        }
        const sendRules = client.post(`tweets/search/stream/rules`, rules);
        const stream = client.stream('tweets/search/stream', params);

        for await (const { data } of stream) {
            let user = { 
                ids: data['author_id']
            };
            let theUser = await client.get(`users`, user)
            theUser = theUser.data[0].name;

            let dataToSend = {
                'username': theUser,
                'tweet_text': data.text
            }
            saveTweet(theUser, data.text);
            io.emit('replayTweet', dataToSend);
        }
        stream.close();
    }
    catch(error) {
        console.log(error)
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/tweet', (req, res) => {
    res.render("singleTweet");
});

app.get('/tweets', async (req, res) => {
        Tweets.find({}, (err, tweet) => {}).then(data => {
            res.render("listTweets", { tweets: data} );
        });
});

app.get('/tweets/:date', async (req, res) => {
    var dateObj = new Date();
    if (req.params.date != 'today') {
        dateObj = new Date(req.params.date + " CDT");
    }

    //dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    newDate = year + "-" + month + "-" + day;
    //console.log(newDate, dateObj)
        await Tweets.find({ tweetedDate : { $eq: newDate } }, (err) => {}).then(data => {
            res.render("listTweets", { tweets: data} );
        });
});

io.on('connection', socket => {
    socket.on('replayTweet', (info) => {
        socket.broadcast.emit('replayTweet', info);
    });

    socket.on('deleteTweet', (info) => {
        deleteTweet(info.id);
    });
});

function saveTweet (name, text) {
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    newDate = year + "-" + month + "-" + day;

    const newTweet = new Tweets({
        name: name,
        text: text,
        tweet_date: newDate
    });
    newTweet.save(err => {
        if (err) {
            console.log(`An error has occurred: ${err}`);
        }
    });
}

function deleteTweet (id) {
    Tweets.findByIdAndDelete(id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
}