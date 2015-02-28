QUnit.test("Quadrants", function (assert) {
	var polar = new Polar(2,2);

	assert.equal(polar.getQuadrant(2, 1), 1, '(2, 1)');
	assert.equal(polar.getQuadrant(2, 0), 1, '(2, 0)');
	assert.equal(polar.getQuadrant(2, 2), 4, '(2, 2)');
	assert.equal(polar.getQuadrant(1, 0), 2, '(1, 0)');
	assert.equal(polar.getQuadrant(1, 2), 4, '(1, 2)');
	assert.equal(polar.getQuadrant(0, 0), 2, '(0, 0)');
	assert.equal(polar.getQuadrant(0, 2), 3, '(0, 2)');
	assert.equal(polar.getQuadrant(0, 1), 3, '(0, 1)');

	assert.equal(polar.getQuadrant(1, 1), 1, '(1, 1)');

});

/*
	00|10|20
	01|11|21
	02|12|22
*/
QUnit.test( "Get angles (extreme values)", function( assert ) {

	var polar = new Polar(2,2);

	assert.equal(polar.getAngle(1,1), 0,			'(1, 1)');

	assert.equal(polar.getAngle(2,1), 0,			'(2, 1)');
	assert.equal(polar.getAngle(2,0), Math.PI/4, 	'(2, 0)');
	assert.equal(polar.getAngle(1,0), Math.PI/2,	'(1, 0)');
	assert.equal(polar.getAngle(0,0), 3*Math.PI/4,	'(0, 0)');
	assert.equal(polar.getAngle(0,1), Math.PI,		'(0, 1)');
	assert.equal(polar.getAngle(0,2), 5*Math.PI/4, 	'(0, 2)');
	assert.equal(polar.getAngle(1,2), 3*Math.PI/2, 	'(1, 2)');
	assert.equal(polar.getAngle(2,2), 7*Math.PI/4, 	'(2, 2)');

});

QUnit.test( "Get sizes", function( assert ) {
	var polar = new Polar(2,2);

	assert.equal(polar.getSize( 2, 0), Math.sqrt(2),	'( 2, 0)');
	assert.equal(polar.getSize( 0, 2), Math.sqrt(2),	'( 0, 2)');
	assert.equal(polar.getSize( 1, 1), 0, 				'( 1, 1)');
	assert.equal(polar.getSize( 2, 1), 1, 				'( 2, 1)');

});

QUnit.test( "Polar to Cartesian (extreme values)", function( assert ) {
	var polar = new Polar(2,2);
	var cases = [
		{ x: 1, y: 1 },
		{ x: 2, y: 1 },
		{ x: 2, y: 0 },
		{ x: 1, y: 0 },
		{ x: 0, y: 0 },
		{ x: 0, y: 1 },
		{ x: 0, y: 2 },
		{ x: 1, y: 2 },
		{ x: 2, y: 2 }
	];
// assert.equal(polar.toCartesian(polar.toPolar(cases[0])), cases[0], JSON.stringify(cases[0]));
// assert.equal(polar.toCartesian(polar.toPolar(cases[1])), cases[1], JSON.stringify(cases[1]));
	cases.forEach(function (coord) {
		// console.log(coord, polar.toPolar(coord));

		// assert.equal(polar.toCartesian(polar.toPolar(coord)), coord, JSON.stringify(coord));
		var tested = polar.toCartesian(polar.toPolar(coord));

		assert.ok(Math.abs(tested.x - coord.x) < 0.0000001, JSON.stringify(coord) + ' x: expected: ' + coord.x + ' result: ' + tested.x);
		assert.ok(Math.abs(tested.y - coord.y) < 0.0000001, JSON.stringify(coord) + ' y: expected: ' + coord.y + ' result: ' + tested.y);
	});
});
// QUnit.test( "Cartesian to Polar (extreme values)", function( assert ) {});