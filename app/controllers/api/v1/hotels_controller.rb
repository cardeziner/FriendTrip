class API::V1::HotelsController < ApplicationController

  def index
    hotels = Hotel.all
  end

end
