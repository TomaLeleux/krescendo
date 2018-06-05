# == Schema Information
#
# Table name: playlists
#
#  id          :bigint(8)        not null, primary key
#  artist_name :string
#  album_name  :string
#  track_name  :string
#  user_id     :bigint(8)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Playlist < ApplicationRecord
  belongs_to :user
end
