# == Schema Information
#
# Table name: searches
#
#  id         :bigint(8)        not null, primary key
#  keyword    :string
#  user_id    :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class SearchTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
