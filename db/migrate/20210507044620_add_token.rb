class AddToken < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :invitation_token, :string
  end
end
