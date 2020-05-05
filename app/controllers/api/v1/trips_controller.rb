class Api::V1::TripsController < ApplicationController

  def index
    render json: Trip.all
  end
end
