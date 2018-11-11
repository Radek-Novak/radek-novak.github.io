// navigator.geolocation.getCurrentPosition = fn => fn({coords: {latitude: 52.4888602, longitude: 13.4078874}})
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
// https://editor.p5js.org/radek-novak/sketches/r1lHugoy2Q
const berlinWall = require('./berlin-wall.json')
const berlinBorder = require('./berlin-border.json')

myflat = [52.50008, 13.4226]
ptInKreuzberg = [52.4888602, 13.4078874]
ptInSalzburg = [47.8072, 13.0445]
ptInTempelhof = [52.4738, 13.4026]
berghain = [52.51137, 13.44326]
frankfurterTor = [52.51582, 13.45397]

console.assert(inside(ptInKreuzberg, berlinWall), 'ptInKreuzberg should be inside berlinWall')
console.assert(inside(ptInTempelhof, berlinWall), 'ptInTempelhof should be inside berlinWall')
console.assert(!inside(berghain, berlinWall), 'berghain should be outside berlinWall')
console.assert(!inside(frankfurterTor, berlinWall), 'frankfurterTor should be outside berlinWall')
console.assert(!inside(ptInSalzburg, berlinWall), 'ptInSalzburg should be outside berlinWall')

console.assert(!inside(ptInSalzburg, berlinBorder), 'ptInSalzburg should be outside berlinBorder')
console.assert(inside(ptInKreuzberg, berlinBorder), 'ptInKreuzberg should be inside berlinBorder')
console.assert(inside(ptInTempelhof, berlinBorder), 'ptInTempelhof should be inside berlinBorder')

console.assert(inside(berghain, berlinBorder), 'berghain should be inside berlinBorder')
console.assert(inside(frankfurterTor, berlinBorder), 'frankfurterTor should be inside berlinBorder')
console.assert(inside(myflat, berlinBorder), 'myflat should be inside berlinBorder')