/** @jsx React.DOM */
'use strict'

var React = require('react/addons')
var Router = require('react-router-component')
var DocumentTitle = require('react-document-title')

var Search = require('./search')
var SearchResults = require('./searchResults')
var Recipe = require('./recipe')
var Home = require('./home')

var Locations = Router.Locations
var Location = Router.Location
var CaptureClicks = require('react-router-component/lib/CaptureClicks')
var Link = require('react-router-component').Link


var App = React.createClass({displayName: "App",

  getInitialState: function() {
    if (typeof window === 'undefined') {
      var entryPath = this.props.path
    } else {
      var entryPath = window.location.pathname
    }
    return {
      entryPath: entryPath
    }    
  },

  searchRecipes: function(query) {
    this.refs.router.navigate('/search/' + encodeURI(query))
  },

  render: function() {
    return (
      React.createElement("html", null, 
        React.createElement("head", null, 
          React.createElement("title", null, "%react-iso-vgs%"), 
          React.createElement("meta", {charSet: "UTF-8"}), 
          React.createElement("link", {href: "http://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900", rel: "stylesheet", type: "text/css"}), 
          React.createElement("link", {href: "http://fonts.googleapis.com/css?family=Merriweather+Sans:800", rel: "stylesheet", type: "text/css"}), 
          React.createElement("link", {rel: "stylesheet", type: "text/css", href: "http://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css"}), 
          React.createElement("link", {rel: "stylesheet", type: "text/css", href: "/css/style.css"})
        ), 
        React.createElement("body", null, 
        React.createElement(Search, {onSearch: this.searchRecipes, entryPath: this.state.entryPath}), 
        React.createElement(DocumentTitle, {title: "%react-iso-vgs%"}, 
        React.createElement(CaptureClicks, null, 
          React.createElement(Locations, {ref: "router", path: this.props.path}, 
            React.createElement(Location, {path: "/", handler: Home}), 
            React.createElement(Location, {path: "/recipe/:recipe_id/:recipe_slug", handler: Recipe}), 
            React.createElement(Location, {path: "/search/:query", handler: SearchResults})
          )
        )
        ), 
        React.createElement("script", {type: "text/javascript", src: "/js/behavior.min.js"})
        )
      )
    )
  }

})


module.exports = {
  routes: App,
  title: DocumentTitle
}


// Bootstrap client
if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(React.createElement(App), document)
  }
}
