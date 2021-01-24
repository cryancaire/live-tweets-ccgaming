require('dotenv').config()
const Twitter = require('twitter-v2');
const socketio = require('socket.io');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 1234;

const server = app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
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
            
            io.emit('tweet', dataToSend);
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

io.on('connection', socket => {
    //console.log(`Connected`);
});

