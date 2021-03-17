class Flight < ApplicationRecord
  belongs_to :trip, optional: true
  belongs_to :user, optional: true
  has_many :userflights
  has_many :users, through: :userflights

end
