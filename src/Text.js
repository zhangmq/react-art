var Mode = require('art/modes/current');
var emptyObject = require('fbjs/lib/emptyObject');
var childrenAsString = require('./utils').childrenAsString;
var createComponent = require('./createComponent');
var RenderableMixin = require('./RenderableMixin');

// Text

var Text = createComponent('Text', RenderableMixin, {

  construct: function(element) {
    this._currentElement = element;
    this._oldString = null;
  },

  mountComponent: function(rootID, transaction, context) {
    var props = this._currentElement.props;
    var newString = childrenAsString(props.children);
    this.node = Mode.Text(newString, props.font, props.alignment, props.path);
    this._oldString = newString;
    this.applyRenderableProps(emptyObject, props);
    return this.node;
  },

  isSameFont: function(oldFont, newFont) {
    if (oldFont === newFont) {
      return true;
    }
    if (typeof newFont === 'string' || typeof oldFont === 'string') {
      return false;
    }
    return (
      newFont.fontSize === oldFont.fontSize &&
      newFont.fontStyle === oldFont.fontStyle &&
      newFont.fontVariant === oldFont.fontVariant &&
      newFont.fontWeight === oldFont.fontWeight &&
      newFont.fontFamily === oldFont.fontFamily
    );
  },

  receiveComponent: function(nextComponent, transaction, context) {
    var props = nextComponent.props;
    var oldProps = this._currentElement.props;

    var oldString = this._oldString;
    var newString = childrenAsString(props.children);

    if (oldString !== newString ||
        !this.isSameFont(oldProps.font, props.font) ||
        oldProps.alignment !== props.alignment ||
        oldProps.path !== props.path) {
      this.node.draw(
        newString,
        props.font,
        props.alignment,
        props.path
      );
      this._oldString = newString;
    }

    this.applyRenderableProps(oldProps, props);
    this._currentElement = nextComponent;
  }

});

module.exports = Text;
