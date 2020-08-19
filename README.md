# README

* Description: FriendTrip is a react-rails app that makes planning a trip with friends simple and easy to manage for everyone. Users can log-in, or sign-up, and organize trips they are planning. Users correspond with each other via votes on events throughout the trip. Events that get a majority vote, automatically get posted to an Itinerary for the group. This makes things easier, because it minimizes arguments about events during a trip, and members of the trip group all get a say with their vote. This way, an itinerary is laid out for all members of group as well, so if people are traveling separately, they all know what group events are taking place, what time, and where they are taking place. By integrating a Geocoding with a Google maps API, each event displays a map with the location of said event , and group members can easily find directions of where they need to be. This makes planning a trip with friends simple, fun, and easy.

* Ruby version : 2.6.5

* Authored by: Peter Stevens

* Built With:
  -React.js
  -Ruby on Rails
  -PostgreSQL 12

* Getting Started:
The setup steps expect the following tools/versions:

Ruby 2.6.5
Rails 5.2.4.2
PostgreSQL 12
Checkout the repository
git clone https://github.com/veeveeanne/where-to-next
Create and setup the database
bundle exec rake db:setup
Run the test suite
bundle exec rspec
Start the Rails server and webpack-dev-server
bundle exec rails s
yarn run start
The application can be accessed via http://localhost:3000
