function ViewModel() {
    this.func = ko.observable("Math.pow(x, 5) - 2 * Math.pow(x, 3) + x - 10");
    this.epsilon = ko.observable(0.0001);
    this.h = ko.observable(0.001);
    this.a = ko.observable(-10);
    this.b = ko.observable(10);
    this.bisection = ko.observable(0);
    this.newton = ko.observable(0);
    this.checkBisection = ko.observable(0);
    this.checkNewton = ko.observable(0);

    this.compute = ko.dependentObservable(function () {
        var viewModel = this;
        if (!viewModel.func || !viewModel.func())
            return;

        var epsilon = parseFloat(viewModel.epsilon() || 0),
            h = parseFloat(viewModel.h() || 0),
            a = parseFloat(viewModel.a() || 0),
            b = parseFloat(viewModel.b() || 0);


        if (epsilon <= 0 || h <= 0 || a > b)
            return;

        try {
            var func = new Function("x", "return " + viewModel.func());

            if (!isFinite(func(0)))
                return;
        } catch (e) {
            return;
        }

        viewModel.bisection(new MethodBisection(func, epsilon).compute(a, b));
        viewModel.newton(new MethodNewton(func, epsilon, h).compute((a + b) / 2));

        viewModel.checkBisection(func(viewModel.bisection()));
        viewModel.checkNewton(func(viewModel.newton()));
    }, this);
}