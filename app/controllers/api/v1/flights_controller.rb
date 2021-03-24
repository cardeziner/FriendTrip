class Api::V1::FlightsController < ApplicationController
require 'net/http'
require 'json'
require 'pry'

def index
  render json: Flight.all
end

def show

end

def flight_data
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

def new

end

protected

def id_params
  params.require(:trip).permit(:id)
end


end
