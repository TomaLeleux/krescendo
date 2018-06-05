class CreateSearches < ActiveRecord::Migration[5.2]
  def change
    create_table :searches do |t|
      t.string :keyword
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
