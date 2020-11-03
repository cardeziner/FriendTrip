class Api::V1::UsersController < ApplicationController
before_action :authenticate_user!

  def index
    user = current_user
    render json: {
    user: user,
  }
  end

end
