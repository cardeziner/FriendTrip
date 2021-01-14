class Users::InvitationsController < Devise::InvitationsController

  def new
    @user = User.new
  end


  def update
    if this
      redirect_to root_path
    else
      super
    end
  end

end
