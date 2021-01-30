class Tripmember < ApplicationRecord
  invitable named_by: :email

  belongs_to :user
  belongs_to :trip

end
