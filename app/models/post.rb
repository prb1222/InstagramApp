# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  caption      :string           not null
#  created_time :integer          not null
#  image        :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer          not null
#

class Post < ActiveRecord::Base
  validates :created_time, :image, presence: true


  belongs_to :user
  has_many :post_taggings
  has_many :tags, through: :post_taggings, source: :tag
end
