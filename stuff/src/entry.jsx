var React = require('react');

var BoxContainer = require('./BoxContainer.js');
var css = require('./main.styl');

React.render( 
  <BoxContainer url = "links.json" /> ,
  // document.getElementById('content')
  document.body
);