function ViewModel(gui) {
    this.step = ko.observable(5);
    this.gui = ko.observable(gui);
    this.func = ko.observable("v*x/100");
    this.v0 = ko.observable(2.5);
    this.x0 = ko.observable(1);
    this.xN = ko.observable(20);
    this.N = ko.observable(5);
    this.zoom = new ZoomViewModel();

    this.compute = ko.dependentObservable(function () {
        var viewModel = this;
        if (!viewModel.func || !viewModel.func())
            return;

        var v0 = parseFloat(viewModel.v0() || 0),
            x0 = parseFloat(viewModel.x0() || 0),
            xN = parseFloat(viewModel.xN() || 0),
            n = parseFloat(viewModel.N() || 0);


        if (x0 > xN || n < 1)
            return;

        try {
            var c = 0,
                func = new Function("x, v", "return " + viewModel.func());
            
            if (!isFinite(func(x0, v0)))
                return;
        } catch(e) {
            return;
        }

        viewModel.gui().updateEvent = [];

        ko.utils.arrayForEach([new MethodRungeKutti(func), new MethodEiler(func)], function(method) {
            method.compute(x0, xN, v0, n);

            for (var i = 0, l = method.points.length - 1; i < l; i++)
                viewModel.gui().updateEvent.push({
                    x1: method.points[i].x,
                    y1: method.points[i].y,
                    x2: method.points[i + 1].x,
                    y2: method.points[i + 1].y,
                    name: method.name
                });
        });
        
        viewModel.gui().update(viewModel.zoom.value());
    }, this);
}