class Api::V1::TripsController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }
require 'uri'
require 'net/http'

  def index
    user = current_user
    render json: {
      trips: user.trips,
      user: user

    }
  end

  def get_geo_data(city, state)
    uri = URI('https://api.positionstack.com/v1/forward')

    params = {
    'access_key' => '2cfdc801d7ace9435a1650bb6ba4b3df',
    'query' => "#{city}",
    'region' => "#{state}",
    'limit' => 1
  }

    uri.query = URI.encode_www_form(params)

    response = Net::HTTP.get_response(uri)

    return response.read_body
  end

  def show
    trip = Trip.find(params[:id])
    geo_data = get_geo_data(trip.city, trip.state)
    hotels = trip.hotels
    flights = trip.flights
    events = trip.events
    chats = trip.chats
    user = current_user
    users = trip.users
    user_flights = user.flights.where(trip_id: trip.id)
    user_trip_hotels = hotels.where(user_id: current_user.id)
    render json: {
      trip: trip,
      events: events,
      users: users,
      user: user,
      flights: flights,
      user_flights: user_flights,
      hotels: hotels,
      chats: chats,
      user_trip_hotels: user_trip_hotels,
      geo_data: geo_data
    }
  end

  def create
    @userId = current_user["id"]

    trip = Trip.new(trip_params)
    if trip.save
      @tripmember = Tripmember.new(user_id: @userId, trip_id: trip["id"])
      @tripmember.save
      render json: { trip: trip, tripmember: @tripmember }
    else
      render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def trip_params
    params.require(:trip).permit(:name, :city, :state, :start_date, :end_date)
  end

end
