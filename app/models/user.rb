class User < ApplicationRecord
  include Invitation::User

  has_many :tripmembers
  has_many :trips, through: :tripmembers
  # # Include default devise modules. Others available are:
  # # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :invitable

  validates :first_name, :last_name, presence: true
end
