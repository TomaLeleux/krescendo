require 'rest-client'
require 'json'

class MTVNewsApiService

  def self.call(choice)
    if choice == "top"
      response = RestClient.get "https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=fed1f3bc447a4395bd79dee2962ac732"
    else
      response = RestClient.get "https://newsapi.org/v2/everything?sources=mtv-news&apiKey=fed1f3bc447a4395bd79dee2962ac732"
    end
    return JSON.parse(response)
  end
end
