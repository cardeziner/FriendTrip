class Userflight < ApplicationRecord
  belongs_to :user
  belongs_to :hotel
  has_many :userflights

end
