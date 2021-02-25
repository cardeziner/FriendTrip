class CreateAirbnb < ActiveRecord::Migration[5.2]
  def change
    create_table :airbnbs do |t|

      t.string :address
      t.string :city
      t.string :state
      t.date :check_in_day
      t.date :check_out_day
      t.time :check_in_time
      t.time :check_out_time
    end
  end
end
