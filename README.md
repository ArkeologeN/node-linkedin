node-linkedin
==============

Another Linkedin wrapper in Node.js

### Why?
Good question! Because when I started to use LinkedIn API, I found couple of wrappers but they were not compatible with OAuth2.0, there contributors didn't made any recent commit from several months and I had to utilize the whole wrapper with nice helper functions as well.

So, I decided to write another wrapper. We need it! So we can also maintain it! However, pull request are always major and we'd love to see that!

### Getting Started

Just like others, its simple and quick as per standard:

`npm install node-linkedin --save`

this will install the module and add the entry in `package.json`. Lets start using it!

```javascript
var linkedin = require('node-linkedin')('api', 'secret', 'callback');
```

## OAuth 2.0

We regret to use 1.0 for authentication and linkedin also supports 2.0. So lets start using it. The below example is inspired from `express.js` but good enough to give the walkthrough.

```javascript
app.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url.
    linkedin.authorize();
});

app.get('/oauth/linkedin/callback', function(req, res) {
    linkedin.getAccessToken(req.query.code, function(err, results) {
        if ( err )
            return console.error(err);
        
        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":"AQXdSP_W41_UPs5ioT_t8HESyODB4FqbkJ8LrV_5mff4gPODzOYR"}
        */
        console.log(results);
        return res.redirect('/');
    });
});
```