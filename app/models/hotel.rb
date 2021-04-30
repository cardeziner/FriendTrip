class Hotel < ApplicationRecord
  belongs_to :trip
  belongs_to :user
  has_many :userflights
  
end
