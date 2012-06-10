var GUI = function(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas.getContext("2d");
    this.center = { x: 100, y: 400 };
    this.colors = {
        plane: "#000000",
        runge: "#00ff00",
        eiler: "#0000ff"
    };
    this.updateEvent = [];
    this.update();
};

(function() {
    this.update = function (zoom) {
        this.zoom = zoom;
	    this.canvas.clearRect(0, 0, this.width, this.height);
	    this.drawCoordinatePlane();
	    for (var i = 0, l = this.updateEvent.length; i < l; i++) {
	        var d = this.updateEvent[i];
	        this.drawLine(d.x1, d.y1, d.x2, d.y2, d.name);
	    }
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

    this.drawLine = function(x1, y1, x2, y2, name) {
        this.canvas.lineWidth = 2;
        this.canvas.strokeStyle = name == "runge" ? this.colors.runge : name == "eiler" ? this.colors.eiler : this.colors.plane;
        this.canvas.beginPath();

        var from = this.toScreenCoordinates(x1, y1);
        var to = this.toScreenCoordinates(x2, y2);

        this.canvas.moveTo(from.x, from.y);
        this.canvas.lineTo(to.x, to.y);

        this.canvas.stroke();
        this.canvas.closePath();
    };
    
    this.toPixel = function (value) {
        return value * this.zoom;
    };

    this.toScreenCoordinates = function (x, y) {
        return { x: this.center.x + this.toPixel(x), y: this.center.y - this.toPixel(y) };
    };
}).call(GUI.prototype);