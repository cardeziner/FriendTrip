class Api::V1::ChatsController < ApplicationController

  def index
    url = request.original_url
    uri = URI::parse(url)
    id = uri.path.split('/')[2]
    trip = Trip.where(id: id)
    render json: trip.chats
  end

  def create
    url = request.original_url
    uri = URI::parse(url)
    id = uri.path.split('/')[2]
    trip = Trip.where(id: id)
    user = current_user
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
