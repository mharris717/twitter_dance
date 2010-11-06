require 'spec_helper'

describe Search do
  before do
    Search.destroy_all
    @search = Search.new(:term => "rspec")
  end
  it "smoke" do
    @search.save!
    Search.count.should == 1
  end
  it "should get tweets" do
    @search.tweets.should be_respond_to(:each)
    @search.tweets.each do |t|
      puts t.inspect
    end
  end
  
end
