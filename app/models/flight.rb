class Flight < ApplicationRecord
  belongs_to :trip, optional: true


end
