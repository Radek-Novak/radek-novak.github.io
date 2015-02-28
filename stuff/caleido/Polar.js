function Polar (w, h) {
    var center = {
        x: w/2,
        y: h/2
    };

    this.centerCoords = function (x, y) {
        return {x: x - center.x, y: -(y - center.y)};
    };

    this.getQuadrant = function (x, y) {
        var c = this.centerCoords(x, y);

        if (c.y >= 0 && c.x > 0)
            return 1;
        if (c.y > 0 && c.x <= 0)
            return 2; 
        if (c.y <= 0 && c.x < 0)
            return 3;
        if (c.y < 0 && c.x >= 0)
            return 4;
        if (c.x === 0 && c.y === 0) 
            return 1;
            
    };

    this.getAngle = function (x, y, noncenter) {
        var c;
        if (noncenter)
            c = {x: x, y: y};
        else 
            c = this.centerCoords(x, y);

        var qAdd = 0;

        switch (this.getQuadrant(x, y)){
            case 1:
                break;
            case 2:
            case 3:
                qAdd += Math.PI;
                break;
            case 4: 
                qAdd += 2*Math.PI;
        }

        if (c.x === 0) 
            if (c.y === 0) 
                return 0;
            else if (c.y < 0) 
                return 3*Math.PI/2;
            else 
                return Math.PI/2;

        return Math.atan(c.y / c.x) + qAdd;
    };
    
    this.getSize = function (x, y) {
        var c = this.centerCoords(x, y);
        cx = Math.abs(c.x);
        cy = Math.abs(c.y);
        return Math.sqrt(cx*cx + cy*cy);
    };

    this.toPolar = function (coords) {
        return {
            size: this.getSize(coords.x, coords.y), 
            angle: this.getAngle(coords.x, coords.y)
        };
    };

    this.toCartesian = function (polarCoords) {
        return {
            x: polarCoords.size * Math.cos(polarCoords.angle)  + center.x ,
            y: -polarCoords.size * Math.sin(polarCoords.angle)  + center.y 
        };
    };

    this.addAngle = function (cartCoords, angle) {
        var nextPolar = this.toPolar({x: cartCoords.x, y: cartCoords.y});
        nextPolar.angle += angle;
        return this.toCartesian(nextPolar);
    };
}
