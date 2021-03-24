class CreateTripflights < ActiveRecord::Migration[5.2]
  def change
    create_table :tripflights do |t|
      t.belongs_to :trip
      t.belongs_to :flight

      t.timestamps null: false
    end
  end
end
