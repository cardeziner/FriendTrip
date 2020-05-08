class Api::V1::TripsController < ApplicationController

  def index
    render json: Trip.all

  end

  def show
    trip = Trip.find(params[:id])
    events = trip.events
    render json: {
      trip: trip,
      events: events
    }
  end

end
