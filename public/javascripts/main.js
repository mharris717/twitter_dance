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
    tagName: 'div',
    
    template: _.template($('#search-template').text()),

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.model.view = this
    },
    
    render: function() {
      var me = this
      $(this.el).html(this.template(this.model.toJSON()));

      console.debug("tweets size " + this.model.get('tweets').length)
      _.each(this.model.get('tweets'),function(tweet) {
        $(me.el).append(tweet['text'])
      })
      
      this.render_callback(this)

      return this;
    }
  });
  
  window.AppView = Backbone.View.extend({
    el: $('#main'),
    
    events : {
      "change #search_term" : "render"
    },
    
    initialize: function() {
      _.bindAll(this, 'render')
    },

    get_term: function() {
      return $('#search_term').val();
    },

    render: function() {
      var me = this
      
      var model = new Search({term: this.get_term()})
      Searches.add(model)
      model.save()
      
      //model.fetch()
      var v = new SearchView({model: model})
      
      v.render_callback = function(v) {
        $(me.el).append(v.el)
      }
    }
  })
  
  Searches = new SearchList()
  window.App = new AppView;
  
  $('#search_term').change()
  
  
});
