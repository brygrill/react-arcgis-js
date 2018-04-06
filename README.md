# react-arcgis-js
A set of React components for the 4.0 version of the ArcGIS API for JavaScript

[![Build Status](https://travis-ci.org/brygrill/react-arcgis-js.svg?branch=master)](https://travis-ci.org/brygrill/react-arcgis-js)

![alt text](https://user-images.githubusercontent.com/14791048/38412403-4c881140-3957-11e8-8208-436efeec1b43.png "react-arcgis-js map screenshot")

## Installation
Add the package from npm:
```bash
$ npm install --save react-arcgis-js
# or
$ yarn add react-arcgis-js
```

Load the JS API styles:
```html
<link href="https://js.arcgis.com/4.6/esri/css/main.css" rel="stylesheet">
```

## Basic Usage
Render a Map:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'react-arcgis-js';

ReactDOM.render(
  <Map />,
  document.getElementById('root')
);
```

Render a Map and FeatureLayer
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Feature } from 'react-arcgis-js';

ReactDOM.render(
  <Map>
    <Feature itemId="8444e275037549c1acab02d2626daaee"/>
  </Map>,
  document.getElementById('root')
);
```
Examples available at https://brygrill.github.io/react-arcgis-js

## Components
### Map
Render a [Map](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html) or [WebMap](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html). Pass an `itemId` prop to render WebMap via Portal Item ID or pass a `baseMap` prop to render a Map.

__Props:__  

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | ----- |
| itemId | string | false | None | [Id of webmap to load](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html#portalItem) |
| baseMap | string | false | streets-navigation-vector | [Basemap to load](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap) |
| height | string | false | 500px | height of map container in px or % |
| width | string | false | 100% | width of map container in px or % |
| center | array | false | [-122.41, 37.77] | coordinates to [center the map on](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#center) |
| zoom | number | false | 10 | starting [zoom level](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#zoom) of the map |
| webGL | boolean | false | false | load dojo config to enable WebGL Feature Layers |
| onLoadingContent | any | false | Loading... | string or component to render while loading map |
| onErrorContent | any | false | Error loading map... | string or component to render on error |
| onError | function | false | None | Will return on error to handle as you wish |
| onMapClick | function | false | None | Will return [mapPoint and graphics object](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#HitTestResult) on map click |

__Map Children:__  
The following props are passed to child components of `<Map/>`:  

| Property | Type | Description |
| --- | --- | ----- |
| map | object | Map or WebMap object |
| view | object | MapView object |
| loading | boolean | loading status |
| error | boolean | error status |

### Feature
Render a [FeatureLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html) as a child of `<Map/>` component. Pass a `url` prop to render via service URL or `itemId` to render via Portal Item ID.

__Props:__  

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | ---  |
| url | string | false | None | render FeatureLayer via service URL |
| itemId | string | false | None | render FeatureLayer via Portal Item ID |

## Acknowledgments
Wouldn't be possible without these projects:
- [react-arcgis](https://github.com/nicksenger/react-arcgis)
- [esri-loader](https://github.com/Esri/esri-loader)
