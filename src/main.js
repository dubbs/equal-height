(function (window, document, $) {

  'use strict';

  /**
   *
   * @param $items
   * @param options
   * @returns {{}}
   */
  function equalHeight(options) {

    var $items = this;
    var groups;

    /**
     * [0]: jQuery.fn.init[...]
     * [1]: jQuery.fn.init[...]
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
     * [0]: jQuery.fn.init[...]
     */
    var groupByAll = function () {
      groups = [$items];
    };

    /**
     *
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
     *
     * @param $groupItems
     */
    var resetHeightForItems = function ($groupItems) {
      $groupItems.css('height', 'auto');
    };

    /**
     *
     * @param $groupItems
     */
    var setHeightForItems = function ($groupItems) {
      var maxHeight = findMaxHeightForItems($groupItems);
      $groupItems.height(maxHeight);
    };

    /**
     *
     * @param index
     * @param $groupItems
     */
    var setHeight = function (index, value) {
      var $groupItems = $(value);
      resetHeightForItems($groupItems);
      setHeightForItems($groupItems);
    };

    /**
     *
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
     *
     */
    var onResize = function () {
      updateHeights();
    };

    /**
     *
     */
    $(window).on('resize', _debounce(onResize, options.resizeTimeout));
    $(document).on('ready', updateHeights);

    /**
     *
     */
    return {};
  }

  /**
   *
   * @param options
   * @returns {*}
   */
  $.fn.equalHeight = function(options) {
    options = $.extend({}, $.fn.equalHeight.defaults, options);
    return equalHeight.call(this, options);
  };

  /**
   *
   * @type {{groupByTop: boolean, resizeTimeout: number}}
   */
  $.fn.equalHeight.defaults = {
    groupByTop: false, // further groups elements using top position, this achieves row based equal heights
    resizeTimeout: 100 // debounce onResize, wait 100ms
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
