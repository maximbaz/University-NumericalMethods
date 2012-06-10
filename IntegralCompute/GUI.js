var GUI = function(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas.getContext("2d");
    this.zoom = 30;
    this.center = { x: 100, y: 400 };
    this.colors = {
        plane: "#000000",
        func: "#ff0000",
        partition: "#00ff00"
    };
    this.updateEvent = [];
    this.update();
};

(function() {
	this.update = function() {
	    this.canvas.clearRect(0, 0, this.width, this.height);
	    this.drawCoordinatePlane();
	    for (var i = 0, l = this.updateEvent.length; i < l; i++)
	        if (typeof this.updateEvent[i].f == "function")
	            this.drawFunction(this.updateEvent[i].f, this.updateEvent[i].a, this.updateEvent[i].b);
	        else
	            this.drawVerticalLine(this.updateEvent[i].f);
	};

    this.drawCoordinatePlane = function () {
        this.canvas.lineWidth = 2;
        this.canvas.strokeStyle = this.colors.plane;
        var arrowOffset = 10, arrowLength = 5;
        this.canvas.beginPath();
        this.canvas.moveTo(arrowOffset, this.center.y);
        this.canvas.lineTo(this.width - arrowOffset, this.center.y);
        this.canvas.lineTo(this.width - arrowOffset - 2*arrowLength, this.center.y - arrowLength);
        this.canvas.moveTo(this.width - arrowOffset, this.center.y);
        this.canvas.lineTo(this.width - arrowOffset - 2*arrowLength, this.center.y + arrowLength);
                    
        this.canvas.moveTo(this.center.x, this.height - arrowOffset);
        this.canvas.lineTo(this.center.x, arrowOffset );
        this.canvas.lineTo(this.center.x - arrowLength, arrowOffset + 2*arrowLength );
        this.canvas.moveTo(this.center.x, arrowOffset );
        this.canvas.lineTo(this.center.x + arrowLength, arrowOffset + 2*arrowLength );

        var dash = 5;
        for(var i=this.center.x, l=this.width - this.zoom; i<l; i+=this.zoom) {
            this.canvas.moveTo(i, this.center.y - dash);
            this.canvas.lineTo(i, this.center.y + dash );
        }
        for(i=this.center.y; i > arrowOffset; i-=this.zoom) {
            this.canvas.moveTo(this.center.x - dash, i);
            this.canvas.lineTo(this.center.x + dash, i);
        }
        
		this.canvas.closePath();
        this.canvas.stroke();
    };

    this.drawFunction = function (f, a, b) {
        this.canvas.lineWidth = 2;
        this.canvas.strokeStyle = this.colors.func;
        this.canvas.beginPath();


        var point = this.toScreenCoordinates(a, f(a));
        this.canvas.moveTo(point.x, point.f);
        for (var step = 0.01, i = a + step; i < b - step; i += step) {
            point = this.toScreenCoordinates(i, f(i));
            this.canvas.lineTo(point.x, point.f);
            this.canvas.moveTo(point.x, point.f);
        }
        this.canvas.stroke();
        this.canvas.closePath();
    };

    this.drawVerticalLine = function(x) {
        this.canvas.lineWidth = 1;
        this.canvas.strokeStyle = this.colors.partition;
        this.canvas.beginPath();

        var point = this.toScreenCoordinates(x);

        this.canvas.moveTo(point.x, this.center.y);
        this.canvas.lineTo(point.x, 20);

        this.canvas.closePath();
        this.canvas.stroke();
    };
    
    this.toPixel = function (value) {
        return value * this.zoom;
    };

    this.toScreenCoordinates = function (x, f) {
        return { x: this.center.x + this.toPixel(x), f: this.center.y - this.toPixel(f) };
    };
}).call(GUI.prototype);