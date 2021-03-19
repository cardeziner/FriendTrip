class Api::V1::TripflightsController < ApplicationController

def index
  trip = Trip.find(params[:id])
  flights = trip.flights
end

end
