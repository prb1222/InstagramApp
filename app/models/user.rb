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

class User < ActiveRecord::Base
  validates :username, :full_name, :profile_pic, presence: true

  has_many :posts
end
