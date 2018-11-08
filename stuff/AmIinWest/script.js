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
const setMsg = message => {
  msg.innerHTML = message;
};

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

btn.addEventListener('click', () => {
  setMsg('Finding your location...')
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
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
          })
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