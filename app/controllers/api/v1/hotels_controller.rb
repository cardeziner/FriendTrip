class Api::V1::HotelsController < ApplicationController

  def index
    binding.pry
    hotels = Hotel.all
    render json: hotels
  end

end
