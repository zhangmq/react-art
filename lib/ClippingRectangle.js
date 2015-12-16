var Mode = require('art/modes/current');
var emptyObject = require('fbjs/lib/emptyObject');
var ContainerMixin = require('./ContainerMixin');
var NodeMixin = require('./NodeMixin');
var createComponent = require('./createComponent');

// ClippingRectangle
var ClippingRectangle = createComponent(
    'ClippingRectangle', NodeMixin, ContainerMixin, {

  mountComponent: function(rootID, transaction, context) {
    this.node = Mode.ClippingRectangle();
    var props = this._currentElement.props;
    this.applyClippingProps(emptyObject, props);
    this.mountAndInjectChildren(props.children, transaction, context);
    return this.node;
  },

  receiveComponent: function(nextComponent, transaction, context) {
    var props = nextComponent.props;
    var oldProps = this._currentElement.props;
    this.applyClippingProps(oldProps, props);
    this.updateChildren(props.children, transaction, context);
    this._currentElement = nextComponent;
  },

  applyClippingProps: function(oldProps, props) {
    this.node.width = props.width;
    this.node.height = props.height;
    this.node.x = props.x;
    this.node.y = props.y;
    this.applyNodeProps(oldProps, props);
  },

  unmountComponent: function() {
    this.destroyEventListeners();
    this.unmountChildren();
  }

});

module.exports = ClippingRectangle;
