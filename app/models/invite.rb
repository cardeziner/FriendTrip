class Invite < ApplicationRecord
  belongs_to :user
  belongs_to :trip

  validates :email, :token, presence: true, uniqueness: true
end
