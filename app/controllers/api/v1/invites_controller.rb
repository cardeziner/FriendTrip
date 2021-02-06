class Api::V1::InvitesController < ApplicationController

  def new
    invite = Invite.new
  end

  def create

    params = user_params
    params["password"] = "password"
    params["password_confirmation"] = "password"
    @user = User.new(params)

    # @invite = Invite.new(email: @user.email,)

    if @user.save
      flash[:notice] = "Friend has been invited"
      InviteMailer.with(email: @user.email).new_invite_email.deliver_later

      redirect_to trips_path
    else
      flash.now[:error] = t('flash.order.error_html')
      render :new
    end
  end

  private

  def invite_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end

end
