class Api::V1::ChatsController < ApplicationController

  def index
    binding.pry
    trip = Trip.find(params[:id])
    render json: trip.chats
  end

  def create
    user = current_user
    trip = Trip.find(params[:id])
    chat = Chat.new(chat_text: chat_params)
    chat.trip_id = trip.id
    chat.user_name = user.first_name + " " + user.last_name[1]
    binding.pry
    if chat.save
      render json: { chat: chat }
    else
      render json: { error: chat.errors.full_messages }, status: :unprocessable_entity
    end
  end

protected

  def chat_params
    params.require(:chat).permit(:chat_text)
  end

  def trip_params
    params.require(:trip_id)
  end

end
