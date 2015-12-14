var assign = require('react/lib/Object.assign');
var NodeMixin = require('./NodeMixin');
// Renderables

var RenderableMixin = assign({}, NodeMixin, {

  applyRenderableProps: function(oldProps, props) {
    if (oldProps.fill !== props.fill) {
      if (props.fill && props.fill.applyFill) {
        props.fill.applyFill(this.node);
      } else {
        this.node.fill(props.fill);
      }
    }
    if (
      oldProps.stroke !== props.stroke ||
      oldProps.strokeWidth !== props.strokeWidth ||
      oldProps.strokeCap !== props.strokeCap ||
      oldProps.strokeJoin !== props.strokeJoin ||
      // TODO: Consider a deep check of stokeDash.
      // This may benefit the VML version in IE.
      oldProps.strokeDash !== props.strokeDash
    ) {
      this.node.stroke(
        props.stroke,
        props.strokeWidth,
        props.strokeCap,
        props.strokeJoin,
        props.strokeDash
      );
    }

    if (
        oldProps.shadow !== props.shadow ||
        oldProps.shadowOffsetX !== props.shadowOffsetX ||
        oldProps.shadowOffsetY !== props.shadowOffsetY ||
        oldProps.shadowBlur !== props.shadowBlur
    ) {
        this.node.shadow(
            props.shadow,
            props.shadowBlur,
            props.shadowOffsetX,
            props.shadowOffsetY
        );
    }

    this.applyNodeProps(oldProps, props);
  },

  unmountComponent: function() {
    this.destroyEventListeners();
  }

});

module.exports = RenderableMixin;
