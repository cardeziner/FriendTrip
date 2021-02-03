class InviteMailer < ApplicationMailer

  def new_invite_email
  @invite = params[:invite]

  mail(to: <ADMIN_EMAIL>, subject: "You got a new invite!")
  end
end
