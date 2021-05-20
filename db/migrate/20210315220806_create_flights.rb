class CreateFlights < ActiveRecord::Migration[5.2]
  def change
    create_table :flights do |t|
      t.string :airline, null: false
      t.string :on_time_status
      t.date :departure_date, null: false
      t.time :departure_time, null: false
      t.date :arrival_date, null: false
      t.time :arrival_time, null: false
      t.belongs_to :trip, null: false
      t.belongs_to :user, null: false
    end
  end
end
