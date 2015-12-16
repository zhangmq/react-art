/**
 * Copyright 2013-2014 Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactART
 */

"use strict";

require('art/modes/fast'); // Flip this to DOM mode for debugging

var ReactART = {
  LinearGradient: require('./fills').LinearGradient,
  RadialGradient: require('./fills').RadialGradient,
  Pattern: require('./fills').Pattern,
  Transform: require('art/core/transform'),
  Path: require('art/modes/current').Path,
  Surface: require('./Surface'),
  Group: require('./Group'),
  ClippingRectangle: require('./ClippingRectangle'),
  Shape: require('./Shape'),
  Text: require('./Text')
};

module.exports = ReactART;
