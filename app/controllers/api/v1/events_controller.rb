class Api::V1::EventsController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Trip.find(params[:trip_id])
  end

  def show
    trip = Trip.find(params[:id])
    events = trip.events
    render json: {
      events: events
    }
  end

  def create
    trip = Trip.find(params[:trip_id])
    event = Event.new(event_params)
    event.votes = 0
    event.trip = trip
    if event.save
      render json: { event: event }
    else
      render json: { error: event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    event = Event.find(params[:id])
    event.votes += 1
    event.save
    render json: { event: event }
  end

  protected

  def event_params
    params.require(:event).permit(:name, :location, :cost, :date)
  end
end
