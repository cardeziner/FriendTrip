class InviteMailer < ApplicationMailer

  def new_invite_email
    email = params[:email]

    mail(to: email, subject: "You got a new invite!")
  end

end
