var React = require('react');
var Box = require('./Box.js');
var PackeryMixin = require('react-packery-mixin');

var packeryOptions = {
    transitionDuration: "0.4s",
    gutter: 10
    // columnWidth: ".gutter-sizer",
};

var BoxList = React.createClass({
  mixins: [PackeryMixin('packeryContainer', packeryOptions)],
 
  render: function() {
    var boxNodes = this.props.data.map(function(box) {
      return ( 
        <Box data={box} /> );
      });
    return ( 
      <div className = "box-list" ref="packeryContainer">
        {boxNodes} 
      </div>);
    }
});

module.exports = BoxList;