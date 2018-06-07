require 'rest-client'
require 'json'

class DeezerApiService
  def self.call(id)
    # musics = []
    # 40.times do |i|
      response = RestClient.get "https://api.deezer.com/artist/#{id}"
      # musics << JSON.parse(response)
      return JSON.parse(response)
    # end
    # return musics
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
    puts music["picture_medium"]
    if music["picture_medium"].include? bad_url # || music["picture_medium"] == bad_url2
      valid_artist
    end
    return music
  end

end
