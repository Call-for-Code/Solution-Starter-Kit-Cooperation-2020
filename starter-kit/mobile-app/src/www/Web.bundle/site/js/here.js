let map = null;
let platform = null;
let ui = null;
let currentMarker = null;
let currentItemMarker = null;
let places = null;
let searchGroup = null;
let router = null;
let routeLineGroup = null;
let selectedRoute = null;
let currentInfoBubble = null;
let geocoder = null;
let searchCallback = false;

const markerRed = `
<svg width="22px" height="31px" viewBox="0 0 22 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M11,1 C5.00584111,0.922155833 0.0822937842,5.71590055 0,11.71 C0.0025279372,14.0375734 0.776170498,16.2987196 2.2,18.14 L11,31 L19.8,18.14 C21.2238295,16.2987196 21.9974721,14.0375734 22,11.71 C21.9177062,5.71590055 16.9941589,0.922155833 11,1 Z" id="outerPath" fill="#DA1E28"></path>
  <path d="M11,7 C8.23857625,7 6,9.23857625 6,12 C6,14.7614237 8.23857625,17 11,17 C13.7614237,17 16,14.7614237 16,12 C16,10.6739176 15.4732158,9.40214799 14.5355339,8.46446609 C13.597852,7.5267842 12.3260824,7 11,7 Z" id="innerPath" fill="#FFFFFF"></path>
</svg>
`.trim();

const markerBlue = `
<svg width="22px" height="31px" viewBox="0 0 22 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M11,1 C5.00584111,0.922155833 0.0822937842,5.71590055 0,11.71 C0.0025279372,14.0375734 0.776170498,16.2987196 2.2,18.14 L11,31 L19.8,18.14 C21.2238295,16.2987196 21.9974721,14.0375734 22,11.71 C21.9177062,5.71590055 16.9941589,0.922155833 11,1 Z" id="outerPath" fill="#1062FE"></path>
  <path d="M11,7 C8.23857625,7 6,9.23857625 6,12 C6,14.7614237 8.23857625,17 11,17 C13.7614237,17 16,14.7614237 16,12 C16,10.6739176 15.4732158,9.40214799 14.5355339,8.46446609 C13.597852,7.5267842 12.3260824,7 11,7 Z" id="innerPath" fill="#FFFFFF"></path>
</svg>
`.trim();

const circleRed = `
<svg width="32" height="32" viewBox="0 0 32 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="Group" transform="translate(13.000000, 27.500000) rotate(20.000000) translate(-13.000000, -27.500000) translate(-3.000000, 0.000000)">
        <circle id="Oval" fill="#DA1E28" cx="16" cy="16" r="16"></circle>
        <path d="M16,32 L16,55" id="Line" stroke="#DA1E28" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
  </g>
</svg>
`.trim()

const searchRadius = 20000; // in meters
const currentCoordinates = {
  lat: 35.7846633,
  lng: -78.6820946
};

const formatDistance = (d) => (d < 1000) ? `${d}m` : `${(d / 1000).toFixed(1)}km`;
const formatDuration = (d) => {
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  return (h > 0) ? `${h}h ${m}min` : `${m}min`;
};
const formatItemInfo = (item) => {
  return `
<p><strong>Name</strong>:<br> ${item.name}</p>
<p><strong>Description</strong>:<br> ${item.description}</p>
<p><strong>Contact</strong>:<br> ${item.contact}</p>
`.trim();
};
const getCoordinates = (location) => {
  const coords = (typeof location === 'string') ? location.split(',') : location;

  if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
    return geocodeSearch(location);
  } else {
    return Promise.resolve({ lat: coords[0], lng: coords[1] });
  }
}

const routeLineStyles = {
  normal: { strokeColor: 'rgba(0, 128, 255, 0.5)', lineWidth: 3 },
  selected: { strokeColor: 'rgba(255, 0, 0, 0.7)', lineWidth: 7 }
};

const getQueryObject = () => {
  return (window.location.search.match(/([^=?&]+=[^&]+)/g)||[])
    .reduce((a,b) => {
      a[b.split('=')[0]] = b.split('=')[1];
      return a;
    }, {});
};

const routeOptions = (from, to) => {
  return {
    mode: 'fastest;car',
    representation: 'display',
    alternatives: 2,
    waypoint0: `geo!${from.lat},${from.lng}`,
    waypoint1: `geo!${to.lat},${to.lng}`,
    routeattributes: 'waypoints,summary,shape,legs',
    maneuverattributes: 'direction,action'
  };
};

const zoomAndCenterAround = function (group) {
  if (group.getChildCount()) {
    map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox()
    });
  }
};

const addInfoBubble = (position, opts) => {
  const options = opts || {};
  if (currentInfoBubble) {
    ui.removeBubble(currentInfoBubble);
    currentInfoBubble.dispose();
    currentInfoBubble = null;
  }
  currentInfoBubble = new H.ui.InfoBubble(position, options);

  ui.addBubble(currentInfoBubble);
  return currentInfoBubble;
};

const addMarker = (position, opts) => {
  const options = opts || {};
  let markerOptions = null;

  if (options.icon) {
    markerOptions = {
      icon: options.icon
    };
  } 

  const marker = new H.map.Marker(position, markerOptions);

  if (options.data) {
    marker.setData(options.data);

    marker.addEventListener('tap', (evt) => {
      const position = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);

      addInfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData()
      });

      if (typeof options.clickListener === 'function') {
        options.clickListener(evt, position);
      }
    })
  } else if (typeof options.clickListener === 'function') {
    marker.addEventListener('tap', () => {
      options.clickListener(evt, position);
    });
  }

  if (!options.skip) {
    map.addObject(marker);
  }

  if (options.recenter) {
    map.getViewModel().setLookAtData({
      position: position,
      zoom: 10
    });
  }

  return marker;
};

const onRouteSelection = (route) => {
  if (selectedRoute) {
    selectedRoute.routeLine.setStyle(routeLineStyles.normal).setZIndex(1);
  }

  route.routeLine.setStyle(routeLineStyles.selected).setZIndex(10);
  selectedRoute = route;
};

const routePanel = function (routes, onRouteSelected) {
  let selectedRoute = null;
  let selectedRouteElement = null;

  const routeList = document.querySelector('#routePanel ul');
  routeList.innerHTML = '';

  const renderRouteTitle = (routeSummary, i) => `<span>Route ${i + 1}</span> (${formatDistance(routeSummary.distance)} in ${formatDuration(routeSummary.travelTime)})`;

  const renderManeuvers = (maneuvers) => {
    const mLi = maneuvers.map(m => `<li>${m.instruction}</li>`).join('');
    return `<ol class="directions">${mLi}</ol>`;
  };

  const renderRouteElement = (route, i) => {
    const element = document.createElement('li');

    element.innerHTML = renderRouteTitle(route.route.summary, i);
    element.innerHTML += renderManeuvers(route.route.leg[0].maneuver);

    element.addEventListener('click', () => {
      if (element.classList.contains('selected')) {
        element.classList.remove('selected');
      } else {
        if (selectedRoute) {
          selectedRouteElement.classList.remove('selected');
        }
        element.classList.add('selected');
        selectedRoute = route;
        selectedRouteElement = element;

        if (typeof onRouteSelected === 'function') {
          onRouteSelected(selectedRoute);
        }
      }
    }, false);

    return element;
  };

  routes.forEach((route, i) => {
    routeList.appendChild(renderRouteElement(route, i));
  });
};

const drawRoute = (route) => {
  const routeShape = route.shape;
  const lineString = new H.geo.LineString();

  routeShape.forEach(function(point) {
    const parts = point.split(',');
    lineString.pushLatLngAlt(parts[0], parts[1]);
  });

  const polyline = new H.map.Polyline(lineString, {
    style: {
      lineWidth: 4,
      strokeColor: 'rgba(0, 128, 255, 0.5)'
    }
  });
  
  map.addObject(polyline);
  return polyline;
};

const calculateRoute = (from, to) => {
  if (routeLineGroup) {
    routeLineGroup.removeAll();
    routeLineGroup = null;
  }
  return getRoute(from, to)
    .then((results) => {
      routeLineGroup = new H.map.Group();

      const routes = results.map((route) => {
        const routeLine = drawRoute(route);
        routeLineGroup.addObject(routeLine);
  
        return {
          route: route,
          routeLine: routeLine
        };
      });
  
      map.addObject(routeLineGroup);
      // zoomAndCenterAround(routeLineGroup);
      return routes;
    }).then((routes) => {
      routePanel(routes, onRouteSelection);
    })
};

const getRoute = function (from, to) {
  if (!router) {
    router = platform.getRoutingService();
  }

  return new Promise((resolve, reject) => {
    router.calculateRoute(
      routeOptions(from, to),
      (result) => {
        resolve(result.response.route);
      }, (error) => {
        reject(error);
      });
  });
};

const searchFor = (query, cb) => {
  searchCallback = cb;
  sendMessage({ search: query });
}

const handleSearchResponse = (results) => {
  if (currentInfoBubble) {
    ui.removeBubble(currentInfoBubble);
    currentInfoBubble.dispose();
    currentInfoBubble = null;
  }
  if (routeLineGroup) {
    routeLineGroup.removeAll();
    routeLineGroup = null;
  }
  if (searchGroup) {
    searchGroup.removeAll();
    searchGroup = null;
  }
  if (currentItemMarker) {
    map.removeObject(currentItemMarker);
    currentItemMarker = null;
  }

  const eventListener = (evt, coordinates) => {
    calculateRoute(currentCoordinates, coordinates);
  };

  searchGroup = new H.map.Group();

  const r = results.map((item) => {
    return getCoordinates(item.location)
      .then(coords => {
        const opts = {
          skip: true,
          data: formatItemInfo(item),
          clickListener: eventListener,
          icon: new H.map.Icon(circleRed, {
            anchor: new H.math.Point(0, 31),
            size: new H.math.Size(28, 28)
          })
        };
    
        searchGroup.addObject(addMarker(
          coords,
          opts
        ));
      });
  });

  Promise.all(r).then(() => {
    if (typeof searchCallback === 'function') {
      searchCallback();
      searchCallback = null;
    }
  
    map.addObject(searchGroup);
    zoomAndCenterAround(searchGroup);
  })
};

const updatePosition = (position) => {
  currentCoordinates.lat = position.latitude || position.lat;
  currentCoordinates.lng = position.longitude || position.lng;

  if (currentMarker) {
    map.removeObject(currentMarker);
    currentMarker = null;
  }

  currentMarker = addMarker(currentCoordinates, {
    data: `<p>Location: ${currentCoordinates.lat},${currentCoordinates.lng}</p>`,
    recenter: true,
    icon: new H.map.Icon(markerBlue, {
      anchor: new H.math.Point(11, 31),
      size: new H.math.Size(22, 31)
    })
  });
};

const updateItemPosition = (item) => {
  if (currentItemMarker) {
    map.removeObject(currentItemMarker);
    currentItemMarker = null;
  }

  const eventListener = (evt, coordinates) => {
    calculateRoute(currentCoordinates, coordinates);
  };
  
  getCoordinates(item.location)
    .then(coords => {
      currentItemMarker = addMarker(coords, {
        data: formatItemInfo(item),
        clickListener: eventListener,
        recenter: true,
        icon: new H.map.Icon(markerRed, {
          anchor: new H.math.Point(11, 31),
          size: new H.math.Size(22, 31)
        })
      });
    });
};

const onMessageReceived = (data) => {
  if (data.item && data.item.location) {
    updateItemPosition(data.item);
  } else if (data.search) {
    handleSearchResponse(data.search);
  } else if (data.coords) {
    updatePosition(data.coords);
  }
};

const geocodeSearch = (query) => {
  if (!geocoder) {
    geocoder = platform.getGeocodingService();
  }

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { searchText: query },
      (results) => {
        const locations = results.Response.View[0].Result;
        if (locations.length) {
          resolve({
            lat: locations[0].Location.DisplayPosition.Latitude,
            lng: locations[0].Location.DisplayPosition.Longitude
          });
        } else {
          resolve(locations)
        }
      },
      (err) => {
        reject(e);
      }
    )
  });
};

const sendMessage = (data) => {
  window.ReactNativeWebView.postMessage(JSON.stringify(data));
};

const initMap = () => {
  const mapContainer = document.getElementById('mapContainer');
  const qs = getQueryObject();

  platform = new H.service.Platform({
    apikey: qs.apikey
  });

  const options = {
    zoom: 8,
    center: currentCoordinates,
    pixelRatio: window.devicePixelRatio || 1
  };

  const defaultLayers = platform.createDefaultLayers();

  map = new H.Map(
    mapContainer,
    defaultLayers.vector.normal.map,
    options
  );

  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  ui = H.ui.UI.createDefault(map, defaultLayers);

  document.addEventListener('message', (message) => {
    if (message.data) {
      onMessageReceived(message.data);
    }
  });

  try {
    sendMessage({ status: 'initialized' });
  } catch(err) {
    onMessageReceived({ coords: currentCoordinates })
  }
};

if (document.readyState !== 'complete') {
  window.addEventListener('load', initMap);
} else {
  initMap();
}
