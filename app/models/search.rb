class Search
  include Mongoid::Document
  field :term
  before_save do |obj|
    obj.tweets = get_tweets if obj.tweets.empty?
  end
  def get_tweets
    res = []
    Twitter::Search.new(term).each { |x| res << x }
    res
  end
  embeds_many :tweets
  def to_json(*args)
    res = attributes.clone
    res['tweets'] = tweets
    res = res.to_json
    puts "json: #{res}"
    res
  end
end
