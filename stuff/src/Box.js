var React = require('react');


var Box = React.createClass({
  render: function() {
      return (
        <div className="box">
          <figure className="box__image">
            <img src={this.props.data.img} />
          </figure>
          <div className="box__name">{this.props.data.title} </div>
          <div className="box__content">{this.props.data.text}</div>
        </div>
    );
  }
});

module.exports = Box;