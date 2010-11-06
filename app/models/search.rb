class Search
  include Mongoid::Document
  field :term
  fattr(:tweets) do
    Twitter::Search.new(term)
  end
  def to_json(*args)
    res = attributes.clone
    res['tweets'] = tweets
    res = res.to_json
    puts "json: #{res}"
    res
  end
end
