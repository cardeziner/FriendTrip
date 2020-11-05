class Event < ApplicationRecord
  belongs_to :trip

  validates :name, presence: true
  validates :location, presence: true
  validates :cost, presence: true
  validates :date, presence: true

end
