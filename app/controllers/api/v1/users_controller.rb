class Api::V1::EventsController < ApplicationController

  def index
    render json: User.all
  end


end
