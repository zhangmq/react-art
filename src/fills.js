// Declarative fill type objects - API design not finalized

var slice = Array.prototype.slice;

function LinearGradient(stops, x1, y1, x2, y2) {
  this.args = slice.call(arguments);
};
LinearGradient.prototype.applyFill = function(node) {
  node.fillLinear.apply(node, this.args);
};

function RadialGradient(stops, fx, fy, rx, ry, cx, cy) {
  this.args = slice.call(arguments);
};
RadialGradient.prototype.applyFill = function(node) {
  node.fillRadial.apply(node, this.args);
};

function Pattern(url, width, height, left, top) {
  this.args = slice.call(arguments);
};
Pattern.prototype.applyFill = function(node) {
  node.fillImage.apply(node, this.args);
};

module.exports = {
    LinearGradient: LinearGradient,
    RadialGradient: RadialGradient,
    Pattern: Pattern
}
