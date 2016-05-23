# Equal Height [![Build Status](https://travis-ci.org/dubbs/equal-height.svg?branch=master)](https://travis-ci.org/dubbs/equal-height)

Equal Height is a jQuery plugin used to set and maintain a maximum height for a set of DOM elements.

## Dependencies

Include the dependencies before you get started.

```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="dist/jquery.equalHeight.min.js"></script>
```

## Options

Each option is listed below, with its default value.

```js
$('.selector').equalHeight({
  // groupByTop: false,
  // resizeTimeout: 100,
  // updateOnDOMReady: true,
  // updateOnDOMLoad: false
})
```

### { groupByTop: false }

Group and set a maximum height based on all of the elements top position.

```js
$('.selector').equalHeight({
  groupByTop: true
})
```

### { updateOnDOMReady: true }

Group and set a maximum height onDOMReady.

```js
$('.selector').equalHeight({
  updateOnDOMReady: true
})
```

### { updateOnDOMLoad: false }

Group and set a maximum height onDOMLoad.

```js
$('.selector').equalHeight({
  updateOnDOMLoad: false
})
```

### { resizeTimeout: 100 }

Set the duration in milliseconds for debouncing the window resize event. 

```js
$('.selector').equalHeight({
  resizeTimeout: 100
})
```

## Contributing

### Install dependencies

```
npm install
```

### Build changes

```
npm run watch-js
```

