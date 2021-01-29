class Api::V1::TripmembersController < ApplicationController

  def index
    render json: Tripmembers.find(params[:trip_id])
  end

  def show
    trip = Trip.find(params[:id])
    tripmembers = trip.users
    render json: {
      tripmembers: tripmembers
    }
  end

  def create
    tripmember = Tripmember.new(tripmember_params)
    if tripmember.save
      render json: { trip: trip }
    else
      render json: { error: trip.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def tripmember_params
    params.require(:trip).permit(:user_id, :trip_id)
  end

end
