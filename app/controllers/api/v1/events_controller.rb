class Api::V1::EventsController < ApplicationController

  def index
    render json: Event.all
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
