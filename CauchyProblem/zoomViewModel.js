function ZoomViewModel() {
    this.value = ko.observable(30);
    this.step = 10;
    this.max = 100;
    this.min = 10;
};

(function() {
    this.plus = function () {
        var zoom = this.zoom;
        if (zoom.value() < zoom.max)
            zoom.value(zoom.value() + zoom.step);
    };
    this.minus = function () {
        var zoom = this.zoom;
        if (zoom.value() > zoom.min) 
            zoom.value(zoom.value() - zoom.step);
    };
}).call(ZoomViewModel.prototype);