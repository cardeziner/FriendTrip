class Api::V1::HotelsController < ApplicationController

  def index
    hotels = Hotel.all
    render json: {
      hotels: hotels,
     }
  end

  def create
    @user = current_user
    @trip = trip_params["trip_id"]
    @hotel = Hotel.new(hotel_params)
    @hotel.user_id = @user.id
    @hotel.user_name = (@user.first_name + " " +  @user.last_name[0] + ".")
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
    params.require(:hotel).permit(:trip_id)
  end

end
