var socketio = io();
var tweetArea = document.getElementById('tweet-area');
var tweetTimer = 10000;

socketio.on('connection', () => {
    socketio.emit('connection', socket);
});

socketio.on('replayTweet', (info) => {
    $('.container').prepend(
        `<div class="input-group tweet" id=${info.id}>
        <div class="input-group-text name_text">${info.username}</div>
        <div class="form-control tweet_text">${info.tweet_text}</div>
        </div>`
    );

    setTimeout(() => {
        let containerToFade = document.getElementById(info.id);
        containerToFade.classList.add('tweetOut');
        setTimeout(() => {
            containerToFade.remove();
        }, 2000);
    }, tweetTimer);
    //$('#tweet-area').prepend(`<div class="tweet_container"><div class="tweet_username">${info.username}</div><div class="tweet_text">${info.tweet_text}</div></div>`);
});