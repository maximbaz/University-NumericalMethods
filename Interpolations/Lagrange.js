var Lagrange = function (table) {
    this.table = table;
    this.points = null;
};

(function () {

    this.count = function (step) {
        this.points = { x: [], f: [] };
        if(this.table.x.length < 2)
            return this.points;
        
        var xt = this.table.x;
        for (var i = 0, l = xt.length; i < l; i++) 
            for(var j=0, distance = (this.get(xt, i + 1) - this.get(xt, i)) / step; j < step; j++) {
                var x = this.get(xt, i) + distance * j;
                this.points.x.push(x);
                this.points.f.push(this.interpolate(x));
				if(i == l - 1)
					break;
            }

        return this.points;
    };

    this.interpolate = function (x) {
        var xt = this.table.x;
        var ft = this.table.f;
        var result = 0;
        for (var i = 0; i < xt.length; i++)
            result += this.coefficient(i, x) * this.get(ft, i);
        return result;
    };

    this.coefficient = function (i, x) {
        var xt = this.table.x;
        var a = 1, b = 1, xi = this.get(xt, i);
        for (var k = 0, l = xt.length; k < l; k++) {
            if (i == k)
                continue;
            var xk = this.get(xt, k);
            a *= x - xk;
            b *= xi - xk;
        }
        return a / b;
    };

    this.get = function (array, index) {
        return array && array.length > index ? array[index] : 0;
    };
}).call(Lagrange.prototype);
