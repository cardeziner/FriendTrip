class Api::V1::InvitesController < ApplicationController

  def new
    invite = Invite.new
  end


  def create
    @trip = Trip.find(params[:id])
    params = user_params
    params["password"] = password
    params["password_confirmation"] = "password"
    @user = User.new(params)
    @tripmember = Tripmember.new(user_id: @user.id, trip_id: @trip.id)
    # @invite = Invite.new(email: @user.email,)

    if @user.save && @tripmember.save
      InviteMailer.with(email: @user.email).new_invite_email.deliver_later

      render json: { user: @user }
      alert("hello")
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def invite_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end

  # def tripmember_params
  #   params.require(:user).permit(:trip_id)
  # end

end
