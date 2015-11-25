class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :full_name, null: false
      t.string :profile_pic, null: false
      t.timestamps null: false
    end

    add_column :posts, :user_id, :integer
    add_index :posts, :user_id
  end
end
