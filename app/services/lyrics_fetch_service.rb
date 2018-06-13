class LyricsFetchService

  def self.call(artist, song)
    fetcher = Lyricfy::Fetcher.new
    begin
      lyric = fetcher.search artist, song.titleize
      p artist
    rescue
      return "Sorry no lyrics available for this song"
    else
      if !lyric.nil?
        return lyric.body('<br>')
      else
        return "Sorry no lyrics available for this song"
      end
    end
  end
end
