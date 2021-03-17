# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_15_220806) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string "name", null: false
    t.string "location", null: false
    t.integer "cost", null: false
    t.string "date", null: false
    t.integer "votes", default: 0, null: false
    t.bigint "trip_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_events_on_trip_id"
  end

  create_table "flights", force: :cascade do |t|
    t.string "airline", null: false
    t.string "on_time_status"
    t.date "departure_date", null: false
    t.time "departure_time", null: false
    t.date "arrival_date", null: false
    t.time "arrival_time", null: false
  end

  create_table "hotels", force: :cascade do |t|
    t.string "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.date "check_in_day"
    t.date "check_out_day"
    t.time "check_in_time"
    t.time "check_out_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invites", force: :cascade do |t|
    t.string "email"
    t.string "token"
    t.integer "sender_id"
    t.integer "recipient_id"
    t.integer "invitable_id"
    t.string "invitable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_invites_on_email"
    t.index ["invitable_id", "invitable_type"], name: "index_invites_on_invitable_id_and_invitable_type"
    t.index ["recipient_id"], name: "index_invites_on_recipient_id"
    t.index ["sender_id"], name: "index_invites_on_sender_id"
    t.index ["token"], name: "index_invites_on_token"
  end

  create_table "tripmembers", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_tripmembers_on_trip_id"
    t.index ["user_id"], name: "index_tripmembers_on_user_id"
  end

  create_table "trips", force: :cascade do |t|
    t.string "name", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "start_date", null: false
    t.string "end_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.integer "invited_by_id"
    t.string "invited_by_type"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
