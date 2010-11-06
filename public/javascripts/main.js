$(function(){
  window.Search = Backbone.Model.extend({
    urlf: function() {
      return "http://localhost:3000/searches/"+this.get('term')
    },

    initialize: function() {
      
    }
  });
  
  window.SearchList = Backbone.Collection.extend({
    model: Search,
    
    url: "http://localhost:3000/searches",
    
    initialize: function() {
      console.debug('list initialize')
    }
  })


  window.SearchView = Backbone.View.extend({
    el: $('#results'),
    
    template: _.template($('#search-template').text()),

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.model.view = this
    },
    
    render: function() {
      var me = this
      $(this.el).html(this.template(this.model.toJSON()));

      _.each(this.model.get('tweets'),function(tweet) {
        var tv = new TweetView({model: tweet})
        tv.render()
        $(me.el).append(tv.el)
      })

      return this;
    }
  });
  
  window.TweetView = Backbone.View.extend({
    tagName: "div", 
    
    template: _.template($('#tweet-template').html().replace("&lt;","<").replace("&gt;",">").replace("&lt;","<").replace("&gt;",">")),
    
    initialize: function() {
      _.bindAll(this, 'render');
    },
    
    render: function() {
      console.debug(this.model)
      $(this.el).html(this.template(this.model));
      return this;
    }
  })
  
  window.AppView = Backbone.View.extend({
    el: $('#main'),
    
    events : {
      "change #search_term" : "render",
      "click a.search" : "doThing"
    },
    
    initialize: function() {
      _.bindAll(this, 'render','doThing')
    },

    get_term: function() {
      return $('#search_term').val();
    },
    
    doThing: function(event) {
      this.showTerm($(event.target).text(),false)
    },
    
    showTerm: function(term,new_term) {
      var me = this
      
      var model = new Search({term: term})
      Searches.add(model)
      model.save()
      
      var link = $("<div>")
      var a = $("<a>").attr("href","#").attr('class','search').text(term)
      link.append(a)
      if (new_term) this.$('#searches').append(link)
      
      var v = new SearchView({model: model})
    },
    
    render: function() {
      this.showTerm(this.get_term(),true)
    }
  })
  
  Searches = new SearchList()
  window.App = new AppView;
  
  $('#search_term').change()
  
  
});
