node-linkedin
==============
[![Dependency Status](https://david-dm.org/ArkeologeN/node-linkedin/status.svg?style=flat)](https://david-dm.org/ArkeologeN/node-linkedin)[![Known Vulnerabilities](https://snyk.io/test/npm/node-linkedin/badge.svg)](https://snyk.io/test/npm/node-linkedin)

Another Linkedin wrapper in Node.js

[![NPM](https://nodei.co/npm/node-linkedin.png)](https://nodei.co/npm/node-linkedin/)

### Why?
Good question! Because when I started to use LinkedIn API, I found couple of wrappers but they were not compatible with OAuth2.0, their contributors hadn't made any recent commits for several months and I had to utilize the whole wrapper with nice helper functions as well.

So, I decided to write another wrapper. We need it! So we can also maintain it! However, pull requests are always major and we'd love to see that!

### Getting Started

Just like others, it's simple and quick as per standard:

[![NPM](https://nodei.co/npm/node-linkedin.png?mini=true)](https://nodei.co/npm/node-linkedin/)

this will install the module and add the entry in `package.json`. Let's start using it!

```javascript
var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
```
You may omit the callback URL. However, you must set it later before requesting
an authorization code.
(This is useful if the callback URL depends on the request (e.g. from multiple domains.)

```javascript
var Linkedin = require('node-linkedin')('app-id', 'secret');
// ...
Linkedin.auth.setCallback('callback-url');
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

## Requesting an Authorization Code

#### OAuth 2.0

Since LinkedIn supports OAuth 2.0 (and we regret to use 1.0 for authentication),
let's start using it.

The example below uses a routing library like `Express`. It is not required
to use this module, but it's good enough to give a quick walkthrough.

```javascript
// Using a library like `expressjs` the module will
// redirect for you simply by passing `res`.
app.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url.
    Linkedin.auth.authorize(res, scope);
});
```

Alternatively, you can leave `res` out, and the module will respond with the redirect url
which you can use to send the `HTTP redirect` on your own.
```javascript
var auth_url = Linkedin.auth.authorize(scope);
```

You may specify a custom state parameter:
```javascript
Linkedin.auth.authorize(res, scope, 'state');
```

#### Callback URL

If you have multiple domains pointing to the same application, you will need to
set the callback URL based on the domain that is making the request.

```javascript
app.get('/oauth/linkedin', function(req, res) {
    // set the callback url
    Linkedin.setCallback(req.protocol + '://' + req.headers.host + '/oauth/linkedin/callback');
    Linkedin.auth.authorize(res, scope);
}
```

#### Scope
The `scope` previously mentioned refers to the data from LinkedIn to which your
application is requesting access.
This depends on your application's permissions registered with LinkedIn.

```javascript
var scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];
```
Note: The scope need not be static.

## Requesting an Access Token

After the user is redirected to LinkedIn to authenticate, they are redirected to
your application's callback URL (whether they accept or decline authorization).
See the end of Step 2 on the
[LinkedIn OAuth 2.0 Documentation](https://developer.linkedin.com/docs/oauth2).

If they accept, be sure to pass the `state` parameter to verify no CSRF
intrusion. This is compared against the state parameter used in authentication.

```javascript
// Again, `res` is optional, you could pass `code` as the first parameter
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

## Companies Search

Supports all the calls as per the documentation available at LinkedIn Companies Search API

```javascript

linkedin.companies_search.name('facebook', 1, function(err, company) {
    name = company.companies.values[0].name;
    desc = company.companies.values[0].description;
    industry = company.companies.values[0].industries.values[0].name;
    city = company.companies.values[0].locations.values[0].address.city;
    websiteUrl = company.companies.values[0].websiteUrl;
});
```

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

linkedin.companies.updates('162479', function(err, company) {
    // Gets all the updates(Posts) along with their details of a company
});

linkedin.companies.getUpdate('162479','UPDATE-c1337-998877665544332211',function(err, companies) {
    // Gets the detail of a single update(Post) of a company
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
