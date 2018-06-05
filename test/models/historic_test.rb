# == Schema Information
#
# Table name: historics
#
#  id          :bigint(8)        not null, primary key
#  information :jsonb
#  user_id     :bigint(8)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class HistoricTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
