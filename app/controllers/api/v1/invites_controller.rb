class Api::V1::InvitesController < ApplicationController

  def new
    invite = Invite.new
  end

  def create
    @invite = Invite.new(invite_params)
    @user = User.new(user_params)
    @tripmember = TripMember.new(user_id: @invite.id, trip: trip_params)
    
    if @invite.save && @user.save && @tripmember.save
      InviteMailer.with(invite: invite).new_invite_email.deliver_later

      flash[:success] = t('flash.order.success')
      redirect_to root_path
    else
      flash.now[:error] = t('flash.order.error_html')
      render :new
    end
  end

  private

  def invite_params
    params.require(:invite).permit(:email)
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name)
  end

  def trip_params
    params.require(:trip).permit(:trip_id)
  end

end
