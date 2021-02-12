class Api::V1::InvitesController < ApplicationController

  def new
    invite = Invite.new
  end


  def create
    # @trip = Trip.find(params[:id])
    params = user_params
    @name = params["first_name"]
    @password = (@name + rand(1..100).to_s)
    params["password"] = @password
    params["password_confirmation"] = @password
    @user = User.new(params)
    # @tripmember = Tripmember.new(user_id: @user.id, trip_id: @trip.id)
    # @invite = Invite.new(email: @user.email,)
    if @user.save
      # flash[:success] = "Friend has been invited"
      InviteMailer.with(user: @name , email: @user.email, password: params["password"]).new_invite_email.deliver_later

      render json: { user: @user }
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :trip_id)
  end

  def tripmember_params
    params.require(:user).permit(:trip_id)
  end

end
