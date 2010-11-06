class SearchesController < ApplicationController
  def index
    @search = Search.new
  end
  def create
    obj = Search.create!(params[:search])
    redirect_to obj
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
