class CreateHotels < ActiveRecord::Migration[5.2]
  def change
    create_table :hotels do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.datetime :check_in, null: false
      t.datetime :check_out, null: false
      t.belongs_to :trip, null: false
      
      t.timestamps null: false
    end
  end
end
