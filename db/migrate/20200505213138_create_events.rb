class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.integer :cost, null: false
      t.string :date, null: false
      t.belongs_to :trip, null: false

      t.timestamps null: false
    end
  end
end
