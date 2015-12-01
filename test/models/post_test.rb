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

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
