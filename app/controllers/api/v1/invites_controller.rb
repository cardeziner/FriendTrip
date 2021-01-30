class Api::V1::InvitesController < ApplicationController

  def new
    invite = Invite.new
  end

end
