var MethodRungeKutti = function(f) {
    this.f = f;
    this.points = [];
    this.name = "runge";
};

(function() {
    this.compute = function (x0, xN, v0, n) {
        this.points = [];
        var h = (xN - x0) / n;
        this.integral(xN, h, x0, v0);
    };

    this.integral = function (xi, h, x0, v0) {
        var vi = this.equals(xi, x0) ? v0 : this.integral(xi-h, h, x0, v0),
            k1 = this.k1(h, xi, vi),
            k2 = this.k2(h, xi, vi, k1),
            k3 = this.k3(h, xi, vi, k2),
            k4 = this.k4(h, xi, vi, k3);

        this.points.push({ x: xi, y: vi });
        return vi + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    };

    this.k1 = function(h, x, v) {
        return h * this.f(x, v);
    };

    this.k2 = function(h, x, v, k1) {
        return h * this.f(x + h / 2, v + (k1 != undefined ? k1 : this.k1(h, x, v)) / 2);
    };

    this.k3 = function(h, x, v, k2) {
        return h * this.f(x + h / 2, v + (k2 != undefined ? k2 : this.k2(h, x, v)) / 2);
    };

    this.k4 = function(h, x, v, k3) {
        return h * this.f(x + h, v + (k3 != undefined ? k3 : this.k3(h, x, v)));
    };

    this.equals = function(a, b) {
        return Math.abs(a - b) < 0.00001;
    };
}).call(MethodRungeKutti.prototype);