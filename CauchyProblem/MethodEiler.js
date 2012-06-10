var MethodEiler = function(f) {
    this.f = f;
    this.points = [];
    this.name = "eiler";
};

(function() {
    this.compute = function (x0, xN, v0, n) {
        this.points = [];
        var h = (xN - x0) / n;
        this.integral(xN, h, x0, v0);
    };

    this.integral = function (xi, h, x0, v0) {
        var vi = this.equals(xi, x0)
            ? v0
            : this.integral(xi - h, h, x0, v0);

        this.points.push({ x: xi, y: vi });
        return vi + h * this.f(xi, vi);
    };
    
    this.equals = function(a, b) {
        return Math.abs(a - b) < 0.00001;
    };
}).call(MethodEiler.prototype);