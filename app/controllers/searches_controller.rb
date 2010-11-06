class SearchesController < ApplicationController
  def index
    @search = Search.new
  end
  def create
    respond_to do |format|
      format.js do
        ps = params[:search] || JSON.parse(params[:model])
        obj = Search.create!(ps)
        puts "obj #{obj.inspect}"
        render :json => obj.to_json
      end
    end
  end
  
  def show
    if params[:id] =~ /^[0-9a-z]{24}$/i
      @search = Search.find(params[:id])
    else
      @search = Search.new(:term => params[:id])
    end
    respond_to do |format|
      format.js { render :json => @search.to_json }
      format.html
    end
  end
end
