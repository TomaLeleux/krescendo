require 'rest-client'
require 'json'

class MTVNewsApiService

  def self.call(choice)
    if choice == "top"
      response = RestClient.get "https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=#{ENV['NEWS_API_KEY']}"
    else
      response = RestClient.get "https://newsapi.org/v2/everything?sources=mtv-news&apiKey=#{ENV['NEWS_API_KEY']}"
    end
    return JSON.parse(response)
  end
end
