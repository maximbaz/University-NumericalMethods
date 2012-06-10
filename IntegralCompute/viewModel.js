var viewModel = {
    integral: ko.observable(),
    integralValue: ko.observable(0),
    epsilon: ko.observable(0.02),
    step: ko.observable(5),
    from: ko.observable(2),
    to: ko.observable(10),
    gui: ko.observable(),
    zoom: ko.observable(30),
    zoomStep: 10,
    maxZoom: 100,
    minZoom: 10,
    drawFunction: function () {
        var result = [];
        for (var i = a; i < b; i += 0.1)
            result.push({ x: i, y: this.f(i) });
    },
    zoomPlus: function () {
        if(this.zoom() < this.maxZoom)
            this.zoom(this.zoom() + this.zoomStep);
    },
    zoomMinus: function () {
        if(this.zoom() > this.minZoom)
            this.zoom(this.zoom() - this.zoomStep);
    },
    func: ko.observable("Math.log(Math.pow(x, 3))")
};

viewModel.zoomChanged = ko.dependentObservable(function () {
    if (this.gui() && this.zoom() < this.maxZoom) {
        this.gui().zoom = this.zoom();
        this.gui().update();
    }
}, viewModel);

viewModel.zoomChanged = ko.dependentObservable(function () {
    if (this.gui() && this.zoom() < this.maxZoom) {
        this.gui().zoom = this.zoom();
        this.gui().update();
    }
}, viewModel);

viewModel.computeIntegral = ko.dependentObservable(function () {
    if (!this.func() || !this.gui())
        return;

    var from = parseFloat(this.from() || 0);
    var to = parseFloat(this.to() || 0);
    var epsilon = parseFloat(this.epsilon() || 0);
    var step = parseFloat(this.step() || 0);
    
    if (from >= to || epsilon <= 0 || step < 1)
        return;

    try {
        var func = new Function("x", "return " + this.func());
        if (!isFinite(func(from)) || !isFinite(func(to)))
            return;
    }
    catch (e) {
        return;
    }
    
    this.integral(new Integral(func));
    this.integralValue(this.integral().compute(from, to, epsilon, step));
    this.gui().updateEvent = [];

    this.gui().updateEvent.push({
        f: this.integral().f,
        a: from,
        b: to
    });
        
    for(var i=0, l=this.integral().partitions.length; i<l; i++)
        this.gui().updateEvent.push({
            f: this.integral().partitions[i]
        });

    this.gui().update();
}, viewModel);