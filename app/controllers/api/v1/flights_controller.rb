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
  # url = URI("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-09-01?inboundpartialdate=2021-12-01")
  #
  # http = Net::HTTP.new(url.host, url.port)
  # http.use_ssl = true
  # http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  #
  # request = Net::HTTP::Get.new(url)
  # request["x-rapidapi-key"] = '26169f8158msh2412dd030a7ba8ep1feac3jsn87364f9e3c07'
  # request["x-rapidapi-host"] = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
  #
  # response = http.request(request)
  #
  # puts response.read_body
end

def create
  flight = Flight.new(strong_params)
  trip = Trip.find(trip_params["trip_id"])
  flight.trip = trip
  flight.users << current_user
  binding.pry
  usertripflights = trip.users(user_params["user_id"])
  if flight.save
      render json: { flight: flight }
    else
      render json: { error: flight.errors.full_messages }, status: :unprocessable_entity
      # look at how error is being received and handle potential array
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
