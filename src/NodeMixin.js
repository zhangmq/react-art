var EventTypes = require('./EventTypes');

// Various nodes that can go into a surface
var pooledTransform = new Transform();

var NodeMixin = {

  construct: function(element) {
    this._currentElement = element;
  },

  getPublicInstance: function() {
    return this.node;
  },

  putEventListener: function(type, listener) {
    var subscriptions = this.subscriptions || (this.subscriptions = {});
    var listeners = this.listeners || (this.listeners = {});
    listeners[type] = listener;
    if (listener) {
      if (!subscriptions[type]) {
        subscriptions[type] = this.node.subscribe(type, listener, this);
      }
    } else {
      if (subscriptions[type]) {
        subscriptions[type]();
        delete subscriptions[type];
      }
    }
  },

  handleEvent: function(event) {
    var listener = this.listeners[event.type];
    if (!listener) {
      return;
    }
    if (typeof listener === 'function') {
      listener.call(this, event);
    } else if (listener.handleEvent) {
      listener.handleEvent(event);
    }
  },

  destroyEventListeners: function() {
    var subscriptions = this.subscriptions;
    if (subscriptions) {
      for (var type in subscriptions) {
        subscriptions[type]();
      }
    }
    this.subscriptions = null;
    this.listeners = null;
  },

  applyNodeProps: function(oldProps, props) {
    var node = this.node;

    var scaleX = props.scaleX != null ? props.scaleX :
                 props.scale != null ? props.scale : 1;
    var scaleY = props.scaleY != null ? props.scaleY :
                 props.scale != null ? props.scale : 1;

    pooledTransform
      .transformTo(1, 0, 0, 1, 0, 0)
      .move(props.x || 0, props.y || 0)
      .rotate(props.rotation || 0, props.originX, props.originY)
      .scale(scaleX, scaleY, props.originX, props.originY);

    if (props.transform != null) {
      pooledTransform.transform(props.transform);
    }

    if (node.xx !== pooledTransform.xx || node.yx !== pooledTransform.yx ||
        node.xy !== pooledTransform.xy || node.yy !== pooledTransform.yy ||
        node.x  !== pooledTransform.x  || node.y  !== pooledTransform.y) {
      node.transformTo(pooledTransform);
    }

    if (props.cursor !== oldProps.cursor || props.title !== oldProps.title) {
      node.indicate(props.cursor, props.title);
    }

    if (node.blend && props.opacity !== oldProps.opacity) {
      node.blend(props.opacity == null ? 1 : props.opacity);
    }

    if (props.visible !== oldProps.visible) {
      if (props.visible == null || props.visible) {
        node.show();
      } else {
        node.hide();
      }
    }

    for (var type in EventTypes) {
      this.putEventListener(EventTypes[type], props[type]);
    }
  },

  mountComponentIntoNode: function(rootID, container) {
    throw new Error(
      'You cannot render an ART component standalone. ' +
      'You need to wrap it in a Surface.'
    );
  }

};

module.exports = NodeMixin;
