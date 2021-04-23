class Api::V1::UserflightsController < ApplicationController

def index
  userflights = Userflight.all
  render json: userflights
end

end
