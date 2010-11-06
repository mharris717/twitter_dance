class Tweet
  include Mongoid::Document
  field :from_user
  field :text
end
