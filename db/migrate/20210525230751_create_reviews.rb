class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.string :review, null: false
    end
  end
end
