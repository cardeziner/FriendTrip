class InviteMailer < ApplicationMailer

  def new_invite_email
    @email = params[:email]
    @user = params[:user]
    @password = params[:password]

    mail(to: @email, subject: "Invite from FriendTrip!")
  end

end
