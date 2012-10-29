// requires
var http = require('http'),
    stat = require('node-static'),
    faye = require('faye');


// static file server to serve the /public folder
var fileServer = new stat.Server('./public');

// pubsub server to push out live data updates
var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

// the main server
var server = http.createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response);
  });
});

bayeux.attach(server);
server.listen(8080);

console.log('Server running on port 8080');

