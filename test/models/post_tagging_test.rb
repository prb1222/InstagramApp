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

require 'test_helper'

class PostTaggingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
