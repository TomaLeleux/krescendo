class Track < ApplicationRecord
  belongs_to :playlist

  validates :track_id, presence: true
end
