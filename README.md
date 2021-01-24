# live-tweets
Used https://www.npmjs.com/package/twitter-v2 as the base twitter api connection.

Setup:

1. You will need valid Twitter developer credentials in the form of a set of consumer keys. You can get early access V2 keys [here](https://developer.twitter.com/en/apply-for-access).

2. Once you set that up, you must create a .env file and put the following variables (with your consumer key, secret and bearer token)
```TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_BEARER_TOKEN=```

3. Open index.js and find this and change `#CCGaming`, `#ccgaming`, and `@cryancaire` to your own values (feel free to add more or remove some values):
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

4. Start the code by typing `npm run dev` in a terminal in the same directory.

5. Add the browser source to your streaming software. URL = localhost:1234

6. (Optional) Customize the css in public/css/style.css to your liking!

That should be it! Feel free to tweet me @cryancaire for questions!
