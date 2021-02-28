require 'factory_bot'
FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { '123456' }
    password_confirmation { '123456' }
    first_name { 'John' }
    last_name { 'Doe' }
  end
end
