var MethodNewton = function(f, epsilon, h) {
    this.f = f;
    this.epsilon = epsilon;
    this.h = h;
};

(function() {
    this.compute = function (x) {
        var a = x - (this.f(x) / this.derivate(x));
        return (Math.abs(this.f(a)) > this.epsilon) ? this.compute(a) : x;
    };

    this.derivate = function(x) {
        return (this.f(x + this.h) - this.f(x - this.h)) / (2 * this.h);
    };
}).call(MethodNewton.prototype);