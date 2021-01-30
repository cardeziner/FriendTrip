class Api::V1::UsersController < ApplicationController
include Invitation::UserRegistration
before_action :authenticate_user!
before_action :set_invite_token, only: [:new]
after_action :process_invite_token, only: [:create]

  def index
    user = current_user
    render json: {
    user: user,
  }
  end

end
