class Trip < ApplicationRecord

  has_many :flights
  has_many :events
  has_many :tripmembers
  has_many :users, through: :tripmembers
  has_many :hotels
  has_many :chats


  validates :name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

end
