class Api::V1::HotelsController < ApplicationController

  def index
    binding.pry
    hotels = Hotel.all
    render json: hotels
  end

  def create
    hotel = Hotel.new(hotel_params)
  end

private

  def hotel_params
    params.require(:hotel).permit(:name, :address, :city, :state, :check_in, :check_out)
  end

end
