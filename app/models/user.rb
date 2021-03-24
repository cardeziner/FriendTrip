class User < ApplicationRecord

  has_many :tripmembers
  has_many :trips, through: :tripmembers
  has_many :userflights
  has_many :flights, through: :userflights

  # # Include default devise modules. Others available are:
  # # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :invitable

  validates :first_name, :last_name, presence: true
end
