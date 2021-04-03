# live-tweets-ccgaming

## Get a live feed of tweets to embed on stream or your website or anything!

![Example Image](/images/live-tweets.gif)

Used https://www.npmjs.com/package/twitter-v2 as the base twitter api connection.

Setup:

1. Make sure you have node.js installed on your computer.

2. Download the code and in a terminal in the same directory run `npm install` to pull in all the required packages.

3. You will need valid Twitter developer credentials in the form of a set of consumer keys. You can get early access V2 keys [here](https://developer.twitter.com/en/apply-for-access).

4. Once you set that up, you must create a .env file and put the following variables (with your info here of course)
`TWITTER_CONSUMER_KEY=`
`TWITTER_CONSUMER_SECRET=`
`TWITTER_BEARER_TOKEN=`
`MONGO_URL=`
`MONGO_DB=`

5. Open index.js and find this and change `#CCGaming`, `#ccgaming`, and `@cryancaire` to your own values (feel free to add more or remove some values):
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

6. Start the code by typing `npm run dev` in a terminal in the same directory.

7. Add the browser source to your streaming software. URL is `localhost:1234`

8. (Optional) Customize the css in `public/css/style.css` to your liking!

## Useful Endpoints

1. `/` - A list of tweets stored in memory - outdated
2. `/tweet` - intended to display one tweet at a time and fade away after a few seconds
3. `/tweets` - a list of tweets stored in a database with a "replay" button next to each of them

That should be it! Feel free to ask questions!
