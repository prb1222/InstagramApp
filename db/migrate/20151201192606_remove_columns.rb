class RemoveColumns < ActiveRecord::Migration
  def change
    remove_column :posts, :thumbnail
    remove_column :users, :profile_pic
    remove_column :users, :full_name
  end
end
