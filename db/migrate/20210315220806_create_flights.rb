class CreateFlights < ActiveRecord::Migration[5.2]
  def change
    create_table :flights do |t|
      t.string :airline, null: false
      t.string :on_time_status
      t.string :departure_date, null: false
      t.string :departure_time, null: false
      t.string :arrival_date, null: false
      t.string :arrival_time, null: false
    end
  end
end
