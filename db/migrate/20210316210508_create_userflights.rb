class CreateUserFlights < ActiveRecord::Migration[5.2]
  def change
    create_table :userflights do |t|
      t.belongs_to :user
      t.belongs_to :flight

      t.timestamps null: false
    end
  end
end
