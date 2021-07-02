class Api::V1::HotelsController < ApplicationController

  def index
    hotels = Hotel.all
    render json: hotels
  end

  def create
    @user = current_user
    @trip = Trip.where(id: trip_params)
    @hotel = Hotel.new(hotel_params)
    @hotel.user_id = @user.id
    @hotel.trip_id = @trip
    if @hotel.save
      render json: { hotel: @hotel }
    else
      render json: @hotel.errors.full_messages, status: :unprocessable_entity
    end
  end

private

  def hotel_params
    params.require(:hotel).permit(:name, :address, :city, :state, :check_in, :check_out)
  end

  def trip_params
    params.permit(:trip_id)
  end

end
