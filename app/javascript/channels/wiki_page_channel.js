import consumer from "./consumer"

consumer.subscriptions.create("WikiPageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
  },

  load_description: function() {
    return this.perform('load_description');
  }
});
