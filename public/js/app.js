var socketio = io();
var tweetArea = document.getElementById('tweet-area');

socketio.on('connection', () => {
    socketio.emit('connection', socket);
});

socketio.on('tweet', (info) => {
    $('#tweet-area').prepend(`<div class="tweet_container"><div class="tweet_username">${info.username}</div><div class="tweet_text">${info.tweet_text}</div></div>`);
});