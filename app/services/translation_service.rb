# require 'open-uri'
# require 'nokogiri'

# class TranslationService
#   def self.call(artist,song)
#     # artistsearch = 'paroles-' + artist.downcase.split().join('-')
#     # songsearch = 'paroles-' + song.downcase.split().join('-')
#     artistsearch = 'paroles-prince'
#     songsearch = 'paroles-uptown'
#     puts artistsearch
#     puts songsearch
#     # https://paroles2chansons.lemonde.fr/paroles-the-beatles/paroles-love-me-do.html
#     url = "https://paroles2chansons.lemonde.fr/#{artistsearch}/#{songsearch}.html"
#     puts url
#     html_file = open(url).read
#     html_doc = Nokogiri::HTML(html_file)
#     puts html_doc.search('h2')
#       # puts element.attribute('href').value
#   end
# end
