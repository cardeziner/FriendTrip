class Api::V1::EventsController < ApplicationController

  def index
    user = User.find(params[:id])
    trips = user.trips
    render json: {
    user: user,
    trips: trips
  }
  end

end
