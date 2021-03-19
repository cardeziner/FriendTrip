class Api::V1::TripflightsController < ApplicationController

def index
  flights = Flight.all
  render json: flights
end

end
