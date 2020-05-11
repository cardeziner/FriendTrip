# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

trip1 = Trip.create(name:"Boys Trip", city:"San Diego", state:"CA", start_date: "09/15/2020", end_date: "09/20/2020")
trip2 = Trip.create(name:"Family Fun", city:"Jacksonville", state:"FL", start_date: "07/11/2020", end_date: "07/17/2020")
trip3 =Trip.create(name:"Work Trip", city:"San Diego", state:"CA", start_date: "10/20/2020", end_date: "10/23/2020")

user1 = User.create(first_name: "Peter", last_name: "Stevens", email:"peter.stevens@gmail.com", password: "password")
user2 = User.create(first_name: "Jeffrey", last_name: "Jefferson", email:"jeffy@gmail.com", password: "password")
user3 = User.create(first_name: "Billiam", last_name: "Cornwall", email:"Iambill@gmail.com", password: "password")

Tripmember.create(user_id: 1, trip_id: 1)
Tripmember.create(user_id: 2, trip_id: 1)
Tripmember.create(user_id: 3, trip_id: 1)

Event.create(name:"Wakeboarding",location:"Bahamas",cost: 1200 ,date:"09/01/2020", trip_id: 1, votes: 1)
Event.create(name:"Surfing",location:"Jacksonville",cost: 1200 ,date:"09/01/2020", trip_id: 1, votes: 2)
Event.create(name:"Paragliding",location:"Aruba",cost: 1200 ,date:"09/01/2020", trip_id: 2)
