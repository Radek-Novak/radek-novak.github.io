// navigator.geolocation.getCurrentPosition = fn => fn({coords: {latitude: 52.4888602, longitude: 13.4078874}})
const inside = require('./point-in-polygon')

// https://editor.p5js.org/radek-novak/sketches/r1lHugoy2Q
const berlinWall = require('./berlin-wall.json')
const berlinBorder = require('./berlin-border.json')

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

console.assert(inside(ptInKreuzberg, berlinBorder), 'ptInKreuzberg should be inside berlinBorder')
console.assert(inside(ptInTempelhof, berlinBorder), 'ptInTempelhof should be inside berlinBorder')

console.assert(inside(berghain, berlinBorder), 'berghain should be inside berlinBorder')