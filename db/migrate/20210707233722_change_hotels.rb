class ChangeHotels < ActiveRecord::Migration[5.2]
  def change
    add_column :hotels, :user_name, :string, optional: true
  end
end
