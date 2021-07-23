class Api::V1::ChatsController < ApplicationController

  def index
    trip = Trip.find(params[:id])
    render json: trip.chats
  end

  def create
    trip = Trip.find(params[:id])
    binding.pry
    user = current_user
    chat = Chat.new(chat_params)
    chat.trip_id = trip.id
    chat.user_name = user.first_name + " " + user.last_name[1]
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

end
