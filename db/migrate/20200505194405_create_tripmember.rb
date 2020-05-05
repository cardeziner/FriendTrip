class CreateTripmember < ActiveRecord::Migration[5.2]
  def change
    create_table :tripmembers do |t|
      t.belongs_to :user
      t.belongs_to :trip

      t.timestamps null: false
    end
  end
end
