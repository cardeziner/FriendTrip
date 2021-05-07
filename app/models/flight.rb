class Flight < ApplicationRecord
  belongs_to :trip, optional: true
  has_many :users, through: :userflights
  has_many :userflights


end
