/* globals $ */

var message = (function () {

  var Message = function(user, text, room) {
    this.user = user;
    this.text = text;
    this.room = room;
  };

  Message.prototype.send = function () {
    $.ajax({
      url: '/classes/messages',
      type: 'POST',
      data: this.serialize(),
      contentType: 'application/json',
      success: function () {
        console.log('Chatterbox: Message Sent!');
      },
      error: function () {
        console.log('Chatterbox: Failed to send message.');
      }
    });
  };

  Message.prototype.serialize = function() {
    return JSON.stringify({
      username: this.user,
      text: this.text,
      roomname: this.room
    });
  };

  return {
    Message: Message
  };
}());
