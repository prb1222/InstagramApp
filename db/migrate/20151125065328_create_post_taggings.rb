class CreatePostTaggings < ActiveRecord::Migration
  def change
    create_table :post_taggings do |t|
      t.integer :post_id, null: false
      t.integer :tag_id, null: false
      t.timestamps null: false
    end

    add_index :post_taggings, :post_id
    add_index :post_taggings, :tag_id
  end
end
