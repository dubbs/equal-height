(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = Date.now || now

function now() {
    return new Date().getTime()
}

},{}],2:[function(require,module,exports){

/**
 * Module dependencies.
 */

var now = require('date-now');

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

},{"date-now":1}],3:[function(require,module,exports){
'use strict';

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupElementsByTop = function groupElementsByTop(groups, element) {
  var top = $(element).offset().top;
  groups[top] = groups[top] || [];
  groups[top].push(element);
  return groups;
};

var groupElementsByZero = function groupElementsByZero(groups, element) {
  groups[0] = groups[0] || [];
  groups[0].push(element);
  return groups;
};

var clearHeight = function clearHeight(elements) {
  $(elements).css('height', 'auto');
};

var getHeight = function getHeight(element) {
  return $(element).height();
};

var applyMaxHeight = function applyMaxHeight(elements) {
  var heights = elements.map(getHeight);
  var maxHeight = Math.max.apply(null, heights);
  $(elements).height(maxHeight);
};

var equalizeHeights = function equalizeHeights(elements, groupByTop) {
  // Sort into groups.
  var groups = groupByTop ? elements.reduce(groupElementsByTop, {}) : elements.reduce(groupElementsByZero, {});
  // Convert to arrays.
  var groupsAsArray = Object.keys(groups).map(function (key) {
    return groups[key];
  });
  // Apply max height.
  groupsAsArray.forEach(clearHeight);
  groupsAsArray.forEach(applyMaxHeight);
};

$.fn.equalHeight = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$groupByTop = _ref.groupByTop;
  var groupByTop = _ref$groupByTop === undefined ? false : _ref$groupByTop;
  var _ref$resizeTimeout = _ref.resizeTimeout;
  var resizeTimeout = _ref$resizeTimeout === undefined ? 20 : _ref$resizeTimeout;
  var _ref$updateOnDOMReady = _ref.updateOnDOMReady;
  var updateOnDOMReady = _ref$updateOnDOMReady === undefined ? true : _ref$updateOnDOMReady;
  var _ref$updateOnDOMLoad = _ref.updateOnDOMLoad;
  var updateOnDOMLoad = _ref$updateOnDOMLoad === undefined ? false : _ref$updateOnDOMLoad;

  // Convert to native array.
  var elements = this.toArray();
  // Handle resize event.
  $(window).on('resize', (0, _debounce2.default)(function () {
    equalizeHeights(elements, groupByTop);
  }, resizeTimeout));
  // Handle load event.
  $(window).on('load', function () {
    if (updateOnDOMLoad) {
      equalizeHeights(elements, groupByTop);
    }
  });
  // Handle ready event.
  $(document).on('ready', function () {
    if (updateOnDOMReady) {
      equalizeHeights(elements, groupByTop);
    }
  });
};

},{"debounce":2}]},{},[3]);
