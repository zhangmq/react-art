// Utilities

function childrenAsString(children) {
  if (!children) {
    return '';
  }
  if (typeof children === 'string') {
    return children;
  }
  if (children.length) {
    return children.join('\n');
  }
  return '';
}

module.exports = {
    childrenAsString: childrenAsString
}
