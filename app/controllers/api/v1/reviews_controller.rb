class Api::V1::InvitesController < ApplicationController

  def index
    render json: Review.all
  end

  

end
