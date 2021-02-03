class Api::V1::InvitesController < ApplicationController

  def new
    invite = Invite.new
  end

  def create
    invite = Invite.new(invite_params)

    if @invite.save
      flash[:success] = t('flash.order.success')
      redirect_to root_path
    else
      flash.now[:error] = t('flash.order.error_html')
      render :new
    end
  end

  private

  def order_params
    params.require(:order).permit(:email, :token)
  end

end
