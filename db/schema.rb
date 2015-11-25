# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151125065437) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "post_taggings", force: :cascade do |t|
    t.integer  "post_id",    null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "post_taggings", ["post_id"], name: "index_post_taggings_on_post_id", using: :btree
  add_index "post_taggings", ["tag_id"], name: "index_post_taggings_on_tag_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "caption"
    t.integer  "created_time", null: false
    t.string   "thumbnail",    null: false
    t.string   "image",        null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "user_id"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",    null: false
    t.string   "full_name",   null: false
    t.string   "profile_pic", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end
