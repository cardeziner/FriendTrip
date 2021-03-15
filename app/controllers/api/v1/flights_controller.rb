class Api::V1::FlightsController < ApplicationController
require 'net/http'
require 'json'
require 'pry'

def index
  flights = Flight.all
end

def new

  params = {
    :access_key => ENV(AVIATION_KEY)
    }
    uri = URI('https://api.aviationstack.com/v1/flights')
    uri.query = URI.encode_www_form(params)
    json = Net::HTTP.get(uri)
    api_response = JSON.parse(json)

    for flight in api_response['results']
        unless flight['live']['is_ground']
            puts sprintf("%s flight %s from %s (%s) to %s (%s) is in the air.",
                flight['airline']['name'],
                flight['flight']['iata'],
                flight['departure']['airport'],
                flight['departure']['iata'],
                flight['arrival']['airport'],
                flight['arrival']['iata']
            )
        end
    end

end


end
