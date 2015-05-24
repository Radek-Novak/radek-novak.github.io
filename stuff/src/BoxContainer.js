var React = require('react');
var BoxList = require('./BoxList.js');


var BoxContainer = React.createClass({
  // var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  render: function() {
    return ( 
      <div className = "box-container">
        {/*<h1> Stuff </h1> */}
        <BoxList data = {this.state.data}/> 
      </div>
  );
}
});

module.exports = BoxContainer;