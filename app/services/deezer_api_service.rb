require 'rest-client'
require 'json'
require 'ohm'

class DeezerApiService
  def self.call(id)
    music = Ohm.redis.call "GET", id
    if music.nil?
      response = RestClient.get "https://api.deezer.com/artist/#{id}"
      music = JSON.parse(response)
      Ohm.redis.call "SET", id, music.to_json
    else
      p "data from cache"
      music = JSON.load music
    end
    return music
  end

  def self.albums(artist_id)
    albums = Ohm.redis.call "GET", "albums_#{artist_id}"
    if albums.nil?
      response = RestClient.get "https://api.deezer.com/artist/#{artist_id}/albums"
      albums = JSON.parse(response)
      Ohm.redis.call "SET", "albums_#{artist_id}", albums.to_json
    else
      p "data from cache"
      albums = JSON.load albums
    end
    return albums
  end

  def self.detailed_album(album_id)
    album = Ohm.redis.call "GET", "album_#{album_id}"
    if album.nil?
      response = RestClient.get "https://api.deezer.com/album/#{album_id}"
      album = JSON.parse(response)
      Ohm.redis.call "SET", "album_#{album_id}", album.to_json
    else
      p "data from cache"
      album = JSON.load album
    end
    return album
  end

  def self.tracks(album_id)
    response = RestClient.get "https://api.deezer.com/album/#{album_id}/tracks"
     return JSON.parse(response)
  end

  def self.search_artists(keyword)
    response = RestClient.get "https://api.deezer.com/search/artist?q=#{I18n.transliterate(keyword)}"
    return JSON.parse(response)
  end

  def self.search_albums(keyword)
    response = RestClient.get "https://api.deezer.com/search/album?q=#{I18n.transliterate(keyword)}"
    return JSON.parse(response)
  end

  def self.search_tracks(keyword)
    response = RestClient.get "https://api.deezer.com/search/album?q=#{I18n.transliterate(keyword)}"
    return JSON.parse(response)
  end

  def self.artist(artist_id)
    artist = Ohm.redis.call "GET", artist_id
    if artist.nil?
      response = RestClient.get "https://api.deezer.com/artist/#{artist_id}"
      artist = JSON.parse(response)
      Ohm.redis.call "SET", artist_id, artist.to_json
    else
      p "data from cache"
      artist = JSON.load artist
    end
    return artist
  end

  def self.album(album_id)
    album = Ohm.redis.call "GET", album_id
    if album.nil?
      response = RestClient.get "https://api.deezer.com/album/#{album_id}"
      album = JSON.parse(response)
      Ohm.redis.call "SET", album_id, album.to_json
    else
      p "data from cache"
      album = JSON.load album
    end
    return album
  end

  def self.track(track_id)
    response = RestClient.get "https://api.deezer.com/track/#{track_id}"
    return JSON.parse(response)
  end

  def self.related_artists(artist_id)
    response = RestClient.get "https://api.deezer.com/artist/#{artist_id}/related"
    return JSON.parse(response)
  end

  def self.valid_artist
    bad_url = "//250x250-000000-80-0-0.jpg"
    id = rand(1...4000)
    music = DeezerApiService.call(id)
    while music["error"] do
      id = rand(1...4000)
      music = DeezerApiService.call(id)
    end
    if music["picture_medium"].include? bad_url
      valid_artist
    end
    return music
  end

end
