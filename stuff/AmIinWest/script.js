// npm: point-in-polygon
function inside(point, vs) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};

const btn = document.getElementById('start');
const msg = document.getElementById('msg');
const map = document.getElementById('map');
const coords = document.getElementById('coords');
const setMsg = message => {
  msg.innerHTML = message;
};

const getMapUrl = (lat, lon) => `//www.openstreetmap.org/export/embed.html?bbox=13.0476,52.6855,13.7769,52.3181&layer=mapnik&marker=${lat},${lon}`
const setCoords = (lat, lon) => {
  map.setAttribute('src', getMapUrl(lat, lon));
  coords.innerHTML = `Coords: ${lat}, ${lon}`
}


const getCoordinates = file => {
  const coords = localStorage.getItem(file)
  
  if (!coords) {
    return fetch(`./${file}.json`).then(resp => resp.json()).then(fetchedCoords => {
      localStorage.setItem(file, JSON.stringify(fetchedCoords))
      return fetchedCoords
    });
  }
  
  return Promise.resolve(coords)
}

const isValidCoord = coord => !isNaN(coord) && typeof coord === 'number';
const validCoords = (lat, lon) => isValidCoord(lat) && isValidCoord(lon)

btn.addEventListener('click', () => {
  setMsg('Finding your location...')
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      if (!validCoords(latitude, longitude)) {
        setMsg(`<b>Invalid coords</b>`);
        throw new Error('Coords are not valid')
      }
      
      setCoords(latitude, longitude);
      getCoordinates('berlin-wall').then(wallCoords => {
        const inWest = inside([latitude, longitude], wallCoords)

        if (inWest) {
          setMsg('You\'re in West Berlin!')
        } else {
          getCoordinates('berlin-border').then(berlinCoords => {
            const inBerlin = inside([latitude, longitude], berlinCoords)
            if (inBerlin) {
              setMsg('You are the East Berlin!')
            } else {
              setMsg('You are the outside of Berlin!')
            }
          });
        }
      })
    }, err => {
      const {code, message} = err
      setMsg(`<b>Unable to retrieve location</b><br /><code>${code}: ${message}</code>`);
    });
  } else {
    setMsg('Geolocation unavailable ☠️')
  }
});