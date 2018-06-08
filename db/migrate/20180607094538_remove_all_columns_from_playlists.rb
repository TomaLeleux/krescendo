class RemoveAllColumnsFromPlaylists < ActiveRecord::Migration[5.2]
  def change
    change_table :playlists do |t|
      t.remove :artist_name, :album_name, :track_name
      t.string :name
    end
  end
end
