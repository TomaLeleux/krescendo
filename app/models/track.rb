class Track < ApplicationRecord
  belongs_to :playlist

  validates :track_name, presence: true
end
