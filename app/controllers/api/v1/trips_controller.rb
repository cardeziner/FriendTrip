class Api::V1::TripsController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Trip.all
  end

  def show
    trip = Trip.find(params[:id])
    events = trip.events
    users = trip.users
    render json: {
      trip: trip,
      events: events,
      users: users
    }
  end

  def create
    trip = Trip.new(trip_params)
    if trip.save
      render json: { trip: trip }
    else
      render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def trip_params
    params.require(:trip).permit(:name, :city, :state, :start_date, :end_date)
  end

end
