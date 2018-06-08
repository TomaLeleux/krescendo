class CreateTracksTable < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :artist_name
      t.string :album_name
      t.string :track_name
      t.references :playlist, foreign_key: true

      t.timestamps
    end
  end
end
