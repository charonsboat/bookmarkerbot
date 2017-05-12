var TwitterBot = require('@drm2/twitterbot');
var dotenv = require('dotenv');

// load our environment variables
dotenv.config();

// initialize the TwitterBot
var bot = new TwitterBot({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var format_status = function (tweet)
{
    return tweet.in_reply_to_status_id_str ? `\n\nhttps://twitter.com/${tweet.in_reply_to_screen_name}/status/${tweet.in_reply_to_status_id_str}` : `\n\nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
};

var stream = bot.filteredStream('#bookmark,#bookmarkthis,#saveforlater,#savethisforlater');

stream.on('tweet', function (tweet) {
    var status = format_status(tweet);
    var message = `Here's your bookmark!\n${status}`;

    bot.message(message, { screen_name: tweet.user.screen_name });

    console.log(tweet);
});

stream.on('connect', function () {
    console.log('connecting...');
});

stream.on('connected', function () {
    console.log('connected!');
});

stream.on('error', function (error) {
    console.log('Error:', error);
})
