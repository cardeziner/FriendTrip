class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :name, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :start_date, null: false
      t.string :end_date, null: false

      t.timestamps null: false
    end
  end
end
