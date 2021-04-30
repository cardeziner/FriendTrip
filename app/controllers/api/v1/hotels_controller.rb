class Api::V1::HotelsController < ApplicationController

  def index
    hotels = Hotel.all
    render json: hotels
  end

end
