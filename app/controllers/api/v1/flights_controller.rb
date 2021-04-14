class Api::V1::FlightsController < ApplicationController
require 'net/http'
require 'json'
require 'pry'

def index
  flights = Flight.all
  render json: flights
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

def create
  flight = Flight.create(strong_params)
  tripflight = Tripflight.create(trip_id: trip_params["trip_id"], flight_id: flight.id)
  userflight = Userflight.create(user_id: user_params["user_id"], flight_id: flight.id)
  if flight.save && tripflight.save && userflight.save
    render json: { flight: flight, tripflight: tripflight, userflight: userflight }
  else
    render json: { error: tripflight.errors.full_messages }, status: :unprocessable_entity
  end
end

private

def user_params
  params.require(:flight).permit(:user_id)
end

def trip_params
  params.require(:flight).permit(:trip_id)
end

def strong_params
  params.require(:flight).permit(:airline, :on_time_status, :departure_date, :departure_time, :arrival_date, :arrival_time, :user_name, :departing_airport, :arriving_airport)
end

end
