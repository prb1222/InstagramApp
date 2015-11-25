# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  validates :title, presence: true

  has_many :post_taggings
  has_many :posts, through: :post_taggings, source: :post
end
