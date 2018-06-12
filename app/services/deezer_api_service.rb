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
    response = RestClient.get "https://api.deezer.com/artist/#{artist_id}/albums"
    return JSON.parse(response)
  end

  def self.detailed_album(album_id)
    response = RestClient.get "https://api.deezer.com/album/#{album_id}"
    return JSON.parse(response)
  end

  def self.tracks(album_id)
    response = RestClient.get "https://api.deezer.com/album/#{album_id}/tracks"
     return JSON.parse(response)
  end

  def self.search_artists(keyword)
    response = RestClient.get "https://api.deezer.com/search/artist?q=#{keyword}"
    return JSON.parse(response)
  end

  def self.search_albums(keyword)
    response = RestClient.get "https://api.deezer.com/search/album?q=#{keyword}"
    return JSON.parse(response)
  end

  def self.search_tracks(keyword)
    response = RestClient.get "https://api.deezer.com/search/album?q=#{keyword}"
    return JSON.parse(response)
  end

  def self.artist(artist_id)
    response = RestClient.get "https://api.deezer.com/artist/#{artist_id}"
    return JSON.parse(response)
  end

  def self.album(album_id)
    response = RestClient.get "https://api.deezer.com/album/#{album_id}"
    return JSON.parse(response)
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
