class AddColumnNulls < ActiveRecord::Migration
  def change
    change_column_null :posts, :user_id, false
    change_column_null :posts, :caption, false
  end
end
