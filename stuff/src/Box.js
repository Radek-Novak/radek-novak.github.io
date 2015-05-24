var React = require('react');


var Box = React.createClass({

  render: function() {
      var divStyle = {
        backgroundImage: 'url(' + this.props.data.img + ')',
      };
      var tags = this.props.data.tags.join(', ');

      return (
        <div className="box">
          <div className="box__name">{this.props.data.title} </div>
          <figure className="box__figure">
            <a href={this.props.data.link}>
              <div className="box__image" style={divStyle} />
            </a>
          </figure>
          <div className="box__content">{this.props.data.text}
            <div className="box__content__tags">{tags}</div>
          </div>
        </div>
    );
  }
});

module.exports = Box;