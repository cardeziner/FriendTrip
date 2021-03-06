class Api::V1::InvitesController < ApplicationController

  def new
    invite = Invite.new
  end


  def create
    params = user_params
    @name = params["first_name"]
    @password = (@name + rand(1..100).to_s)
    params["password"] = @password
    params["password_confirmation"] = @password
    @user = User.new(params)
    if @user.save

      @tripmember = Tripmember.new(user_id: @user["id"], trip_id: trip_params["trip_id"])

      if @tripmember.save
        InviteMailer.with(user: @name , email: @user.email, password: @password).new_invite_email.deliver_later
        render json: { user: @user, tripmember: @tripmember }
      else
        render json: { error: "Error occurred, please try again" }, status: :unprocessable_entity
      end
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :trip_id)
  end

  def trip_params
    params.permit(:trip_id)
  end

end
