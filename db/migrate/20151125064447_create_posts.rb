class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :caption
      t.integer :created_time, null: false
      t.string :thumbnail, null: false
      t.string :image, null: false
      t.timestamps null: false
    end
  end
end
