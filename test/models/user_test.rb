# == Schema Information
#
# Table name: users
#
#  id          :integer          not null, primary key
#  username    :string           not null
#  full_name   :string           not null
#  profile_pic :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
