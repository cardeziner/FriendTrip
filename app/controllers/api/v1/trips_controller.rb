class Api::V1::TripsController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def index
    user = current_user
    render json: user.trips
  end

  def show
    trip = Trip.find(params[:id])
    flights = trip.flights
    events = trip.events
    user = current_user
    users = trip.users
    user_flights = user.flights
    render json: {
      trip: trip,
      events: events,
      users: users,
      user: user,
      flights: flights,
      user_flights: user_flights
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
