class CreateUserhotels < ActiveRecord::Migration[5.2]
  def change
    create_table :userhotels do |t|
      t.belongs_to :user
      t.belongs_to :hotel

      t.timestamps null: false
    end
  end
end
