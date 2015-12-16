var Mode = require('art/modes/current');
var emptyObject = require('fbjs/lib/emptyObject');
var childrenAsString = require('./utils').childrenAsString;
var createComponent = require('./createComponent');
var RenderableMixin = require('./RenderableMixin');
// Shape

var Shape = createComponent('Shape', RenderableMixin, {

  construct: function(element) {
    this._currentElement = element;
    this._oldPath = null;
  },

  mountComponent: function(rootID, transaction, context) {
    this.node = Mode.Shape();
    var props = this._currentElement.props;
    this.applyShapeProps(emptyObject, props);
    return this.node;
  },

  receiveComponent: function(nextComponent, transaction, context) {
    var props = nextComponent.props;
    var oldProps = this._currentElement.props;
    this.applyShapeProps(oldProps, props);
    this._currentElement = nextComponent;
  },

  applyShapeProps: function(oldProps, props) {
    var oldPath = this._oldPath;
    var path = props.d || childrenAsString(props.children);
    if (path !== oldPath ||
        oldProps.width !== props.width ||
        oldProps.height !== props.height) {
      this.node.draw(
        path,
        props.width,
        props.height
      );
      this._oldPath = path;
    }
    this.applyRenderableProps(oldProps, props);
  }

});

module.exports = Shape;
