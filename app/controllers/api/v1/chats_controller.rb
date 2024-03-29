class Api::V1::ChatsController < ApplicationController

  def index
    chats = Chat.all
    user = current_user
    render json: {
      chats: chats,
      current_user: user,
      }
  end

  def create
    trip_id = params["event"]["trip_id"]
    user = current_user
    chat = Chat.new(chat_text: params["event"]["chat_text"])
    chat.trip_id = trip_id
    chat.user_name = user.first_name + " " + user.last_name[0]
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
