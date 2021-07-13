class Api::V1::ChatsController < ApplicationController

  def index
    trip = Trip.find(params[:id])
    render json: trip.chats
  end

  
end