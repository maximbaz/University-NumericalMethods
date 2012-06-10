var Graph = function (interpolation, canvas, center, zoom, color, toScreenCoordinates) {
    this.interpolation = interpolation;
    this.step = 7;
    this.canvas = canvas;
    this.color = color;
    this.center = center;
    this.zoom = zoom;
    this.toScreenCoordinates = toScreenCoordinates;
};

(function () {
    this.draw = function () {
        this.canvas.strokeStyle = this.color;
        this.canvas.beginPath();
		var points = this.interpolation.count(this.step);
        for(var i=0, l=points.x.length - 1; i<l; i++) {
			var point = this.toScreenCoordinates(points.x[i],points.f[i]);
            this.canvas.moveTo( point.x, point.f );
			point = this.toScreenCoordinates(points.x[i + 1], points.f[i + 1]);
            this.canvas.lineTo( point.x, point.f);
        }
		this.canvas.closePath();
        this.canvas.stroke();
    };
}).call(Graph.prototype);
