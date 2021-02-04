class Api::V1::InvitesController < ApplicationController

  def new
    invite = Invite.new
  end

  def create
    @user = User.new(user_params, password: "password")
    @invite = Invite.new(email: @user.email)
    @tripmember = TripMember.new(user_id: @user.id, trip_id: trip_params)

    if @invite.save && @user.save && @tripmember.save
      InviteMailer.with(invite: @invite, email: @user.email).new_invite_email.deliver_later

      flash[:success] = t('flash.order.success')
      redirect_to root_path
    else
      flash.now[:error] = t('flash.order.error_html')
      render :new
    end
  end

  private

  def invite_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end

end
