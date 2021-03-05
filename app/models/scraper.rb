require 'nokogiri'
require 'open-uri'
require 'pry'

class Scraper

  def scrape_city_urls
    airBnB_url = 'https://www.hometogo.com/rental/3b9e09eeb2589213?adults=1&arrival=2021-03-13&bathrooms=1&bedrooms=1&clickId=7XF9G5811GBK754Q&directId=3b9e09eeb2589213&duration=6&id=bd0fdaaf13dfbd93&isHotel=0&location=5460aeac2e5b2&pCon=953.12%7CUSD%7C2021-03-13%7C6%7C1%7C1614911465%7C0%7C0%7C1614911465%7C1%7C0%7C0&persons=1&pricetype=perNight&prodName=JM&prodSource=Search&sT=withDates&screen=search&searchId=4ffe88ae3a4e8911&timestamp=2021-03-05T03%3A31%3A05%2B01%3A00'
    html = open(airBnB_url)
    doc = Nokogiri::HTML(html)

    # airbnb_info = doc.xpath("//h1")[0]

    binding.pry
  end

  scrape = Scraper.new
  scrape.scrape_city_urls
end
