import debounce from 'debounce';

const groupElementsByTop = function (groups, element) {
  const top = $(element).offset().top;
  groups[top] = groups[top] || [];
  groups[top].push(element);
  return groups;
};

const groupElementsByZero = function (groups, element) {
  groups[0] = groups[0] || [];
  groups[0].push(element);
  return groups;
};

const clearHeight = function (elements) {
  $(elements).css('height', 'auto');
};

const getHeight = (x) => {
  return $(x).height();
};

const applyMaxHeight =  function (elements) {
  const heights = elements.map(getHeight);
  const maxHeight = Math.max.apply(null, heights);
  $(elements).height(maxHeight);
};

const equalizeHeights = function (elements, groupByTop) {
  // Sort into groups.
  const groups = groupByTop ?
    elements.reduce(groupElementsByTop, {}) :
    elements.reduce(groupElementsByZero, {});
  // Convert to arrays.
  const groupsAsArray = Object.keys(groups).map((key) => {
    return groups[key];
  });
  // Apply max height.
  groupsAsArray.forEach(clearHeight);
  groupsAsArray.forEach(applyMaxHeight);
};

$.fn.equalHeight = function ({ groupByTop = false, resizeTimeout = 100, updateOnDOMReady = true, updateOnDOMLoad = false }) {
  // Convert to native array.
  const elements = this.toArray();
  // Handle resize event.
  $(window).on('resize', debounce(() => {
    equalizeHeights(elements, groupByTop);
  }, resizeTimeout));
  // Handle load event.
  $(window).on('load', () => {
    if (updateOnDOMLoad) {
      equalizeHeights(elements, groupByTop);
    }
  });
  // Handle ready event.
  $(document).on('ready', () => {
    if (updateOnDOMReady) {
      equalizeHeights(elements, groupByTop);
    }
  });
};
