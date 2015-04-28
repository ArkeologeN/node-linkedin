node-linkedin
==============

Another Linkedin wrapper in Node.js

[![NPM](https://nodei.co/npm/node-linkedin.png)](https://nodei.co/npm/node-linkedin/)

### Why?
Good question! Because when I started to use LinkedIn API, I found couple of wrappers but they were not compatible with OAuth2.0, there contributors didn't made any recent commit from several months and I had to utilize the whole wrapper with nice helper functions as well.

So, I decided to write another wrapper. We need it! So we can also maintain it! However, pull request are always major and we'd love to see that!

### Getting Started

Just like others, its simple and quick as per standard:

[![NPM](https://nodei.co/npm/node-linkedin.png?mini=true)](https://nodei.co/npm/node-linkedin/)

this will install the module and add the entry in `package.json`. Lets start using it!

```javascript
var Linkedin = require('node-linkedin')('api', 'secret', 'callback');
```

Before invoking any endpoint, please get the instance ready with your access token.

```javascript
var linkedin = Linkedin.init('my_access_token');
// Now, you're ready to use any endpoint
```

Additionally, you can specify options. Currently, the only supported option is `timeout`, allowing you to specific a timeout (in ms) for the HTTP request. The default is 60 seconds (a value of 60000).

```javascript
var linkedin = Linkedin.init('my_access_token', {
    timeout: 10000 /* 10 seconds */
});
```

## OAuth 2.0

We regret to use 1.0 for authentication and linkedin also supports 2.0. So lets start using it. The below example is inspired from `express.js` but good enough to give the walkthrough.

```javascript
// Using a library like `expressjs` the module will
// redirect for you simply by passing `res`.
app.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url.
    Linkedin.auth.authorize(res, ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages']);
});

// otherwise you can leave `res` out, and the module will respond with the redirect url
Linkedin.auth.authorize(['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages']);

// Again, `res` is optional, you could pass `code` as the first parameter
// Be sure to pass the `state` parameter to verify no CSRF intrusion, see [step 2 here](https://developer.linkedin.com/docs/oauth2)
app.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
        if ( err )
            return console.error(err);

        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":". . . ."}
         */

        console.log(results);
        return res.redirect('/');
    });
});
```

However if you do not use express or any library which has `redirect` method available on `res` argument then you could make it optional and the function would return `url` to be executed instead and then you could use that to handle `HTTP redirect` from your own.

## Companies

Supports all the calls as per the documentation available at: [LinkedIn Companies API](http://developer.linkedin.com/documents/company-lookup-api-and-fields).

```javascript

linkedin.companies.company('162479', function(err, company) {
    // Here you go
});

linkedin.companies.name('logica', function(err, company) {
    // Here you go
});

linkedin.companies.email_domain('apple.com', function(err, company) {
    // Here you go
});

linkedin.companies.multiple('162479,universal-name=linkedin', function(err, companies) {
    // Here you go
});

linkedin.companies.asAdmin(function(err, companies) {
    // Here you go
});
```

## Profile

Searches for the profiles as per the criteria.

### Logged In User Profile.

```javascript
linkedin.people.me(function(err, $in) {
    // Loads the profile of access token owner.
});

OR

linkedin.people.me(['id', 'first-name', 'last-name'], function(err, $in) {
    // Loads the profile of access token owner.
});
```

### Profile by Public URL.

```javascript
linkedin.people.url('long_public_url_here', function(err, $in) {
    // Returns dob, education
});

OR

linkedin.people.url('long_public_url_here', ['id', 'first-name', 'last-name'], function(err, $in) {
    // Returns dob, education
});
```

### Profile by Id.

```javascript
linkedin.people.id('linkedin_id', function(err, $in) {
    // Loads the profile by id.
});

OR

linkedin.people.id('linkedin_id', ['id', 'first-name', 'last-name'], function(err, $in) {
    // Loads the profile by id.
});

```

## Connections

Invokes LinkedIn's Connections API.

```javascript
linkedin.connections.retrieve(function(err, connections) {
    // Here you go! Got your connections!
});

```

## Groups

Implements wrapper for `LinkedIn Group API` and provides interface to invoke API endpoints.

PS: For now, we just have feeds available.

### Group discussions by Group ID
```javascript
linkedin.group.feeds(3769732, function(err, data) {
    // data: variable is ready to use.
});
```

OR If you want to have custom field selector, take a look at this;

```javascript
linkedin.group.feeds(3769732, ['field', 'field2', 'field3'] , function(err, data) {
    // data: variable is ready to use.
});
```

OR even if you want to have custom sorting parameters, you can just pass them as third argument:

```javascript
linkedin.group.feeds(3769732, ['field', 'field2', 'field3'], {order: 'popularity'}, function(err, data) {
    // data: variable is ready to use.
});
```

## Author

This wrapper has been written & currently under maintenance by [Hamza Waqas](http://github.com/ArkeologeN). He's using twitter at: [@HamzaWaqas](http://twitter.com/HamzaWaqas)
