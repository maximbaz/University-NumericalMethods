var Integral = function(f) {
    this.partitions = [];
    this.f = f;
    this.minH = 0.001;
};

(function() {
    this.compute = function (a, b, epsilon, step) {
        this.partitions.push(a);
        var result = 0;
        var h = (b - a) / step;
        for (var i = 0; i < step; i++) {
            var from = a + h * i;
            var partialWithBigH = this.partial(from, from + h, h);
            var hDecreased = h;
            do {
                var partialWithSmallH = this.partial(from, from + h, hDecreased / 2);
                var needToDecreaseH = !this.isCorrectByRunge(partialWithBigH, partialWithSmallH, epsilon) && hDecreased > this.minH;
                if (needToDecreaseH)
                    hDecreased /= 2;
            }
            while (needToDecreaseH)
            result += Math.abs(partialWithSmallH);
            for(var k=hDecreased; k <=h; k += hDecreased)
                this.partitions.push(from + k);
        }
        return result;
    };

    this.partial = function(a, b, h) {
        var result = 0;
        for (var i = a; i < b; i += h)
            result += this.integral(i, i + h);
        return result;
    };

    this.integral = function(x1, x2) {
        var h = x2 - x1;
        return h / 6 * (this.f(x1) + 4 * this.f(x1 + h / 2) + this.f(x2));
    };

    this.isCorrectByRunge = function (Ihi, Ih2i, epsilon) {
        return (Math.abs(Ihi - Ih2i) / 15) < epsilon;
    };
}).call(Integral.prototype);