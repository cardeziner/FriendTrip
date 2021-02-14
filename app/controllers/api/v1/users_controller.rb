class Api::V1::UsersController < ApplicationController
include Invitation::UserRegistration
before_action :authenticate_user!
before_action :set_invite_token, only: [:new]
after_action :process_invite_token, only: [:create]

  def index
    users = User.all
    user = current_user
    render json: {
    user: user,
    users: users
  }
  end

#   def create
#     user = User.new(user_params)
#     user["password"] = "password"
#     user["password_confirmation"] = "password"
#     if user.save
#       render json: { user: user }
#     else
#       render json: { error: user.errors.full_messages }, status: :unprocessable_entity
#     end
#   end
#
# private
#
#   def user_params
#     params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
#   end

end
