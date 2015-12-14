"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var VectorWidget = require('./VectorWidget');

//require('art/modes/svg');
require('art/modes/fast');

ReactDOM.render(<VectorWidget />, document.getElementById('container'));
