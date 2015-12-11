var Mode = require('art/modes/current');
var React = require('react');
var ReactInstanceMap = require('react/lib/ReactInstanceMap');
var ReactUpdates = require('react/lib/ReactUpdates');
var ContainerMixin = require('./ContainerMixin');
// Surface is a React DOM Component, not an ART component. It serves as the
// entry point into the ART reconciler.
var Surface = React.createClass({

  displayName: 'Surface',

  mixins: [ContainerMixin],

  componentDidMount: function() {

    this.node = Mode.Surface(+this.props.width, +this.props.height, this.domNode);

    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(
      this.mountAndInjectChildren,
      this,
      this.props.children,
      transaction,
      ReactInstanceMap.get(this)._context
    );
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  },

  componentDidUpdate: function(oldProps) {
    var node = this.node;
    if (this.props.width != oldProps.width ||
        this.props.height != oldProps.height) {
      node.resize(+this.props.width, +this.props.height);
    }

    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(
      this.updateChildren,
      this,
      this.props.children,
      transaction,
      ReactInstanceMap.get(this)._context
    );
    ReactUpdates.ReactReconcileTransaction.release(transaction);

    if (node.render) {
      node.render();
    }
  },

  componentWillUnmount: function() {
    this.unmountChildren();
  },

  render: function() {
    // This is going to be a placeholder because we don't know what it will
    // actually resolve to because ART may render canvas, vml or svg tags here.
    // We only allow a subset of properties since others might conflict with
    // ART's properties.
    var props = this.props;

    // TODO: ART's Canvas Mode overrides surface title and cursor
    return (
      <Mode.Surface.tagName
        ref={c => this.domNode = c}
        accesskey={props.accesskey}
        className={props.className}
        draggable={props.draggable}
        role={props.role}
        style={props.style}
        tabindex={props.tabindex}
        title={props.title}
      />
    );
  }

});

module.exports = Surface;
