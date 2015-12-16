var assign = require('react/lib/Object.assign');

function createComponent(name) {
  var ReactARTComponent = function(props) {
    this.node = null;
    this.subscriptions = null;
    this.listeners = null;
    this._mountImage = null;
    this._renderedChildren = null;
    this._mostRecentlyPlacedChild = null;
  };
  ReactARTComponent.displayName = name;
  for (var i = 1, l = arguments.length; i < l; i++) {
    assign(ReactARTComponent.prototype, arguments[i]);
  }

  return ReactARTComponent;
}

module.exports = createComponent;
