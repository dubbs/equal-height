(function (window, document, $) {

  'use strict';

  /**
   * Equalizes height for a group of selected elements
   * @param options
   * @returns {{}}
   */
  function equalHeight(options) {

    var $items = this;
    var groups;

    /**
     * Return multiple groups of elements by offset top
     * @returns [0: jQuery.fn.init[...], 1: jQuery.fn.init[...]]
     */
    var groupByTop = function () {
      var obj = {};
      $items.each(function (index, value) {
        var top = parseInt($(value).offset().top, 10);
        if (obj[top] === void 0) {
          obj[top] = $();
        }
        obj[top] = obj[top].add($(value));
      });
      // convert obj to array, zero indexed
      groups = $.map(obj, function(value, index) {
        return [value];
      });
    };

    /**
     * Return a single group of all elements
     * @returns [0: jQuery.fn.init[...]]
     */
    var groupByAll = function () {
      groups = [$items];
    };

    /**
     * Find the max height for a group of elements
     * @param $groupItems
     * @returns {number}
     */
    var findMaxHeightForItems = function ($groupItems) {
      var heights = $groupItems.map(function () {
        return $(this).height();
      }).get();
      return Math.max.apply(null, heights);
    };

    /**
     * Reset elements to their default height
     * @param $groupItems
     */
    var resetHeightForItems = function ($groupItems) {
      $groupItems.css('height', 'auto');
    };

    /**
     * Set height for items in group
     * @param $groupItems
     */
    var setHeightForItems = function ($groupItems) {
      var maxHeight = findMaxHeightForItems($groupItems);
      $groupItems.height(maxHeight);
    };

    /**
     * Set height for items
     * @param index
     * @param $groupItems
     */
    var setHeight = function (index, value) {
      var $groupItems = $(value);
      resetHeightForItems($groupItems);
      setHeightForItems($groupItems);
    };

    /**
     * Group items, then set heights
     */
    var updateHeights = function () {
      if (options.groupByTop) {
        groupByTop();
      } else {
        groupByAll();
      }
      $.each(groups, setHeight);
    };

    /**
     * Handler - Resize
     */
    var onResize = function () {
      updateHeights();
    };

    /**
     * Handler - DOM Ready
     */
    var onDOMReady = function () {
      if (options.updateOnDOMReady) {
        updateHeights();
      }
    };

    /**
     * Handler - DOM Load
     */
    var onDOMLoad = function () {
      if (options.updateOnDOMLoad) {
        updateHeights();
      }
    };

    /**
     * Event handlers
     */
    $(window).on('resize', _debounce(onResize, options.resizeTimeout));
    $(window).on('load', onDOMLoad);
    $(document).on('ready', onDOMReady);

    /**
     * Public interface
     */
    return {};
  }

  /**
   * jQuery fn
   * @param options
   * @returns {*}
   */
  $.fn.equalHeight = function(options) {
    options = $.extend({}, $.fn.equalHeight.defaults, options);
    return equalHeight.call(this, options);
  };

  /**
   * jQuery fn defaults
   * @type {{groupByTop: boolean, resizeTimeout: number}}
   */
  $.fn.equalHeight.defaults = {
    groupByTop: false, // group elements using top position, row based
    resizeTimeout: 100, // debounce onResize 100ms
    updateOnDOMReady: true, // update heights onDOMReady
    updateOnDOMLoad: false // update heights onDOMLoad
  };

  // Underscore.JS - 1.8.3 - debounce
  var _now = Date.now || function() {
      return new Date().getTime();
  };
  var _debounce = function(func, wait) {
    var timeout, args, context, timestamp, result;
    var later = function() {
      var last = _now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    };
    return function() {
      context = this;
      args = arguments;
      timestamp = _now();
      if (!timeout) timeout = setTimeout(later, wait);
      return result;
    };
  };

}(this, this.document, this.jQuery));

