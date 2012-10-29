# Simple Chat

This is my quick sample project for Codecademy. I put it together in about
4 hours today, so don't expect anything too mindblowing. 

## The Idea

This is basically a small node.js application for simple, anonymous, ephemeral
chat rooms. It's a thin layer over the Faye pubsub library, allowing users to
enter and post to arbitrary channels.

Posts are never persisted anywhere, so you only get to see what's happening when
you're there. Users are differentiated by colored timestamps that are unique per
user per page load. Basically, everytime the page is loaded, a new UUID is
generated for the user and a random UUID-to-color mapping is generated to
differentiate posts by different users. When a user refreshes the page, they
flush away their old identity and will be unrecognizable to whoever remained in
the channel. 

## Usage

If you don't have node installed:

    brew install node

Then just:

    node faye-server.js

or, if you're big on Procfiles:

    foreman start

The server should now be running on port 8080.

To access it, simply open `localhost:8080` in your (modern please) browser. This
will put you in the default channel: `#lobby`. You can go to any other channel
by simply loading the page with that hash in the URL (i.e.
`localhost:8080/#codecademy`)

Now, anyone else present in that channel will see your messages and you will see
theirs. Users (including you) will keep a persistent color while they are in the
channel, but this will be randomized if either of you refresh the page.

## The Point

This is obviously more of an interesting experiment in what's possible with
a small amount of code than a robust user-facing solution. I wouldn't really
consider it a "complete" anything without a lot more input validation and
error checking.

That being said, it's a neat little project that could come in handy as a cheap
and easy throwaway chat for anyone who wants to run one. It also shows that it's
not too hard to add these "advanced" realtime features to existing sites,
leveraging new technologies to increase user engagement. 

