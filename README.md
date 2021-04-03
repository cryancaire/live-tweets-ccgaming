# live-tweets-ccgaming

### Stats
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/cryancaire/live-tweets-ccgaming?style=plastic)
![Lines of code](https://img.shields.io/tokei/lines/github/cryancaire/live-tweets-ccgaming?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/cryancaire/live-tweets-ccgaming?style=plastic)
[![Generic badge](https://img.shields.io/badge/Language-Javascript-yellow.svg?syle=plastic)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Language-CSS-blue.svg?syle=plastic)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Language-HTML-orange.svg?syle=plastic)](https://shields.io/)

![GitHub followers](https://img.shields.io/github/followers/cryancaire?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/cryancaire?style=social)

## Get a live popup of tweets to embed on stream or your website or anything!

![Example Image](/images/tweet_popup.gif)
![Example Image](/images/listoftweets.png)

Used https://www.npmjs.com/package/twitter-v2 as the base twitter api connection.

Setup:

1. Make sure you have node.js installed on your computer.

2. Download the code and in a terminal in the same directory run `npm install` to pull in all the required packages.

3. You will need valid Twitter developer credentials in the form of a set of consumer keys. You can get early access V2 keys [here](https://developer.twitter.com/en/apply-for-access).

4. You will need a mongodb to use with this (or comment out the few lines of mongo related code and you wont need it.)

5. Once you set that up, you must create a .env file and put the following variables (with your info here of course)
`TWITTER_CONSUMER_KEY=`
`TWITTER_CONSUMER_SECRET=`
`TWITTER_BEARER_TOKEN=`
`MONGO_URL=`
`MONGO_DB=`

6. Open index.js and find this and change `#CCGaming`, `#ccgaming`, and `@cryancaire` to your own values (feel free to add more or remove some values):
These are basically the rules by which the stream of live tweets will be fed to this application. More info [here](https://developer.twitter.com/en/docs/tutorials/stream-tweets-in-real-time)
```
    const rules ={
        "add": [
            //set your own rules
            { "value": "#CCGaming"},
            { "value": "#ccgaming"},
            { "value": "@cryancaire"},
        ]
    };
```

7. Start the code by typing `npm run dev` in a terminal in the same directory.

8. Add the browser source to your streaming software. URL is `localhost:1234`

9. (Optional) Customize the css in `public/css/style.css` to your liking!

## Useful Endpoints

1. `/` - A list of tweets stored in memory - outdated
2. `/tweet` - intended to display one tweet at a time and fade away after a few seconds
3. `/tweets` - a list of tweets stored in a database with a "replay" button next to each of them
4. `/tweets/today` - get the list of tweets from today
5. `/tweets/{yyyy-m-d}` gets the list of tweets on the specified date

That should be it! Feel free to ask questions!
