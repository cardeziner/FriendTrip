class AddHotelNames < ActiveRecord::Migration[5.2]
  def change
    add_column :hotels, :name, :string, null: false
  end
end
