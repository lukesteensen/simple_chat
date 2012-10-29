$(function () {

  client = new Faye.Client('http://localhost:8080/faye');

  client.subscribe('/*', function(msg) {
    var html = '<p data-user="' + user_id +
      '"><small style="color: ' + user_color(msg.sender_id) + ';">' +
      moment(msg.timestamp).format("HH:mm:ss") +
      "</small> " + msg.text + "</p>";
    messageDiv.append(html);
    messageDiv.children("p").last()[0].scrollIntoView();
  });

  // UUIDs courtesy of http://stackoverflow.com/a/2117523/394282
  var user_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

  // function to generate/memoize unique colors per user id
  var user_color = (function() {
    var user_colors = {};
    // stolen from: http://paulirish.com/2009/random-hex-color-code-snippets/
    var randColor = function() { return '#'+Math.floor(Math.random()*16777215).toString(16); };
    user_colors[user_id] = randColor();
    var get_color = function(user) {
      var existing = user_colors[user];
      if ( existing === undefined ) {
        user_colors[user] = randColor();
        return user_colors[user];
      } else {
        return existing;
      }
    };
    return get_color;
  })();


  var messageDiv = $(".messages");

  $("input[type=button]").click(function() {
    send();
  });

  $("input[type=text]").keydown(function(e) {
    if ( e.which == 13 ) {
      e.preventDefault();
      send();
    }
  });

});

function send() {
  var msg = $("input[type=text]").val();
  client.publish("/chan", {text: msg, timestamp: new Date().getTime(), sender_id: user_id});
  $("input[type=text]").val("");
}


