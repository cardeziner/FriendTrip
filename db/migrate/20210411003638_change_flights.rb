class ChangeFlights < ActiveRecord::Migration[5.2]
  def change
    add_column :flights, :user_name, :string, optional: true
    add_column :flights, :departing_airport, :string, optional: true
    add_column :flights, :arriving_airport, :string, optional: true
  end
end
