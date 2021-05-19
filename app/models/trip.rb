class Trip < ApplicationRecord

  has_many :events
  has_many :tripmembers
  has_many :users, through: :tripmembers
  has_many :flights


  validates :name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

end
