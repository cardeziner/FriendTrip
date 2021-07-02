class Api::V1::HotelsController < ApplicationController

  def index
    binding.pry
    hotels = Hotel.all
    render json: hotels
  end

  def create
    @user = current_user
    @hotel = Hotel.new(hotel_params, user: @user)
    if @hotel.save
      render json: hotel.errors.full_messages, status: :unprocessable_entity
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

private

  def hotel_params
    params.require(:hotel).permit(:name, :address, :city, :state, :check_in, :check_out)
  end

  def trip_params
    params.require(:hotel.permit(:trip_id))
  end
  
end
