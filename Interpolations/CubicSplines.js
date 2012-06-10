var CubicSplines = function (table) {
    this.table = table;
    this.points = null;
    this.splines = null;
};

(function () {

    this.count = function (step) {
        this.points = { x: [], f: [] };
        if(this.table.x.length < 2)
            return this.points;

        this.countSplines();
        
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
        var s;
        
        if(x <= this.splines[0].x)
            s = this.splines[1];
        else if(x >= this.splines[xt.length -1].x)
            s = this.splines[xt.length - 1];
        else {
            var i = 0, j = xt.length - 1;
            while(i + 1 < j) {
                var k = parseInt(i + (j - i) / 2);
                if(x <= this.splines[k].x)
                    j = k;
                else
                    i = k;
            }
            s = this.splines[j];
        }
        var dx = x - s.x;
        return s.a + (s.b + (s.c / 2 + s.d * dx / 6) * dx) * dx;
    };

    this.countSplines = function () {
        this.splines = [];
        var xt = this.table.x;
        var ft = this.table.f;
        for (var i = 0, l = xt.length; i < l; i++)
            this.splines[i] = { x: this.get(xt, i), a: this.get(ft, i) };
        this.splines[0].c = this.splines[xt.length - 1].c = 0;

        var alpha = [], beta = [];
        alpha[0] = beta[0] = 0;
        for (i = 1, l = xt.length - 1; i < l; i++) {
            var h_i = this.get(xt, i) - this.get(xt, i - 1),
                h_i1 = this.get(xt, i + 1) - this.get(xt, i),
                a = h_i,
                c = 2 * (h_i + h_i1),
                b = h_i1,
                f = 6 * ((this.get(ft, i + 1) - this.get(ft, i)) / h_i1 - (this.get(ft, i) - this.get(ft, i - 1)) / h_i),
                z = a * alpha[i - 1] + c;
            alpha[i] = -b / z;
            beta[i] = (f - a * beta[i - 1]) / z;
        }

        for (i = xt.length - 2; i > 0; i--)
            this.splines[i].c = alpha[i] * this.splines[i + 1].c + beta[i];

        for (i = xt.length - 1; i > 0; --i) {
            h_i = this.get(xt, i) - this.get(xt, i - 1);
            this.splines[i].d = (this.splines[i].c - this.splines[i - 1].c) / h_i;
            this.splines[i].b = h_i * (2.0 * this.splines[i].c + this.splines[i - 1].c) / 6.0 + (this.get(ft, i) - this.get(ft, i - 1)) / h_i;
        }
    };

    this.get = function (array, index) {
        return array && array.length > index ? array[index] : 0;
    };
}).call(CubicSplines.prototype);
