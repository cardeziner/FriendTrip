class Chat < ApplicationRecord
  belongs_to :trip

  validates :user_name, presence: true
  validates :chat_text, presence: true
  
end
