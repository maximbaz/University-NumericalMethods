var MethodBisection = function (f, epsilon) {
    this.f = f;
    this.epsilon = epsilon;
};

(function() {
    this.compute = function (a, b) {
        var x = (a + b) / 2;
        
        if (this.f(x) == 0)
            return x;
        else if ((b - a) > this.epsilon) 
            return (this.f(a) * this.f(x) < 0) ? this.compute(a, x) : this.compute(x, b);
        
        return (b + a) / 2;
    };
}).call(MethodBisection.prototype);