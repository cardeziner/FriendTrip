class API::V1::AirbnbsController < ApplicationController

  def index
    airbnbs = Airbnb.all
  end

end
