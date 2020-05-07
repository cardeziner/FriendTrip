class Api::V1::TripsController < ApplicationController

  def index
    render json: Trip.all
  end

  def show
    render json: Trip.find(params[:id])
  end

end
