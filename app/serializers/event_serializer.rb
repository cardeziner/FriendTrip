class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :cost, :date

  belongs_to :trips
end
