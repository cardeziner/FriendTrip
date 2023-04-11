class CreateChat < ActiveRecord::Migration[5.2]
  def change
    create_table :chats do |t|
      t.string :user_name, null: false
      t.string :chat_text, null: false
      t.belongs_to :trip, null: false

      t.timestamps null: false
    end
  end
end
