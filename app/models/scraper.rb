require 'nokogiri'
require 'open-uri'
require 'pry'

class Scraper

  def scrape_city_urls
    idaho_url = 'http://www.museumsusa.org/museums/?k=1271400%2cState%3aID%3bDirectoryID%3a200454'
    html = open(idaho_url)
    doc = Nokogiri::HTML(html)

    cities = doc.css('#city').css('.browseCategoryItem').css('a')
    binding.pry
  end

  scrape = Scraper.new
  scrape.scrape_city_urls
end
