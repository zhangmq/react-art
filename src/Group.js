var emptyObject = require('fbjs/lib/emptyObject');
var Mode = require('art/modes/current');
var ContainerMixin = require('./ContainerMixin');
var createComponent = require('./createComponent');
var NodeMixin = require('./NodeMixin');
// Group

var Group = createComponent('Group', NodeMixin, ContainerMixin, {

  mountComponent: function(rootID, transaction, context) {
    this.node = Mode.Group();
    var props = this._currentElement.props;
    this.applyGroupProps(emptyObject, props);
    this.mountAndInjectChildren(props.children, transaction, context);
    return this.node;
  },

  receiveComponent: function(nextComponent, transaction, context) {
    var props = nextComponent.props;
    var oldProps = this._currentElement.props;
    this.applyGroupProps(oldProps, props);
    this.updateChildren(props.children, transaction, context);
    this._currentElement = nextComponent;
  },

  applyGroupProps: function(oldProps, props) {
    this.node.width = props.width;
    this.node.height = props.height;
    this.applyNodeProps(oldProps, props);
  },

  unmountComponent: function() {
    this.destroyEventListeners();
    this.unmountChildren();
  }

});

module.exports = Group;
