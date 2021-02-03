# Preview all emails at http://localhost:3000/rails/mailers/invite_mailer
class InviteMailerPreview < ActionMailer::Preview
  def new_invite_email
    # Set up a temporary order for the preview
    invite = Invite.new(email: "joe@gmail.com")

    InviteMailer.with(invite: invite).new_invite_email
  end
end
