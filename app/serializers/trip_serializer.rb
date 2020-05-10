class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :start_date, :end_date

  has_many :events
end
