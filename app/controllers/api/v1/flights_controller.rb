class Api::V1::FlightsController < ApplicationController
require 'uri'
require 'net/http'
require 'openssl'

def index
  flights = Flight.all
  render json: flights
end

def show

end

def flight_data
  url = URI("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-09-01?inboundpartialdate=2021-12-01")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Get.new(url)
  request["x-rapidapi-key"] = '26169f8158msh2412dd030a7ba8ep1feac3jsn87364f9e3c07'
  request["x-rapidapi-host"] = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'

  response = http.request(request)
  binding.pry
  puts response.read_body
end

def create
  flight_data
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
