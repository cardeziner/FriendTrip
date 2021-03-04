require 'nokogiri'
require 'open-uri'
require 'pry'

class Scraper

  def scrape_city_urls
    airBnB_url = 'https://www.airbnb.com/rooms/16879963?adults=2&check_in=2021-03-03&check_out=2021-03-04&federated_search_id=85b0331c-3818-46dd-92c0-e51df2889c1a&source_impression_id=p3_1614821799_EMjhmAb9XmXQQwCm&guests=1'
    html = open(airBnB_url)
    doc = Nokogiri::HTML(html)

    airbnb_info = doc.xpath("//h1")[0]

    binding.pry
  end

  scrape = Scraper.new
  scrape.scrape_city_urls
end
