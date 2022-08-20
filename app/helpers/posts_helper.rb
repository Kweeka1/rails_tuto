require 'nokogiri'

module PostsHelper
  URL = 'https://en.wikipedia.org/wiki/HTML'.freeze
  def get_wiki_page
    html_page = Net::HTTP.get URI(URL)

    doc = Nokogiri::HTML5(html_page)
    k = doc.css('p:nth-of-type(2)').text
    k
  end
end
