class User < ApplicationRecord

  has_many :reviews
  has_many :flights
  has_many :tripmembers
  has_many :trips, through: :tripmembers
  has_many :userhotels
  has_many :hotels, through: :userhotels

  # # Include default devise modules. Others available are:
  # # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :invitable

  validates :first_name, :last_name, presence: true
end
