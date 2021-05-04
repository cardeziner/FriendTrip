class CreateHotels < ActiveRecord::Migration[5.2]
  def change
    create_table :hotels do |t|

      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.date :check_in_day
      t.date :check_out_day
      t.time :check_in_time
      t.time :check_out_time

      t.timestamps null: false
    end
  end
end
