class Users::InvitationsController < Devise::InvitationsController

  def new
    @user = User.new
  end

  def create
      @user = User.new(user_params)
      if @user.save
        flash[:notice] = 'You signed up succefully!'
        flash[:color] = 'valid'
      else
        flash[:notice] = 'Form is invalid.'
        flash[:color] = 'invalid'
        render 'new'
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
