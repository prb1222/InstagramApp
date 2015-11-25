# == Schema Information
#
# Table name: post_taggings
#
#  id         :integer          not null, primary key
#  post_id    :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PostTagging < ActiveRecord::Base
  validates :post_id, :tag_id, presence: true

  belongs_to :tag
  belongs_to :post
end
