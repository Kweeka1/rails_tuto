class WikiPageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "post_creation"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_description(text)
    ActionCable.server.broadcast 'post_creation', message: text
  end
end
