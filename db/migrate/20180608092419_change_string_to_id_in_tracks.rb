class ChangeStringToIdInTracks < ActiveRecord::Migration[5.2]
  def change
    remove_column :tracks, :artist_name, :string
    remove_column :tracks, :album_name, :string
    remove_column :tracks, :track_name, :string
    add_column :tracks, :artist_id, :bigint
    add_column :tracks, :album_id, :bigint
    add_column :tracks, :track_id, :bigint
  end
end
