require 'rest-client'
require 'json'

class DeezerApiService
  def self.call(id)
    response = RestClient.get "https://api.deezer.com/artist/#{id}"
    return JSON.parse(response)
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

  def self.valid_artist
    bad_url = "//250x250-000000-80-0-0.jpg"
    bad_url2 = "https://cdns-images.dzcdn.net/images/artist//250x250-000000-80-0-0.jpg"
    id = rand(1...4000)
    music = DeezerApiService.call(id)
    while music["error"] do
      id = rand(1...4000)
      music = DeezerApiService.call(id)
    end
    if music["picture_medium"].include? bad_url # || music["picture_medium"] == bad_url2
      valid_artist
    end
    return music
  end

end
