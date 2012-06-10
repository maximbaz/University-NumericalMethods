var GUI = function(canvas, interpolations, table) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas.getContext("2d");
    this.zoom = 30;
    this.center = { x: 100, y: 400 };
    this.colors = ["#ff0000", "#0000ff", "#009900" ];
    this.graphs = this.createGraphs(interpolations);
    this.table = table;

    this.updateCanvas();
};

(function() {
	this.updateCanvas = function() {
	    this.canvas.clearRect(0, 0, this.width, this.height);
	    this.drawCoordinatePlane();
	    for(var i=0, l=this.graphs.length; i<l; i++)
	        this.graphs[i].draw();
	    this.drawTablePoints();
	};

    this.drawCoordinatePlane = function () {
        this.canvas.lineWidth = 2;
        this.canvas.strokeStyle = "#000000";
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
        for(var i=this.center.y; i > arrowOffset; i-=this.zoom) {
            this.canvas.moveTo(this.center.x - dash, i);
            this.canvas.lineTo(this.center.x + dash, i);
        }
        
		this.canvas.closePath();
        this.canvas.stroke();
    };

    this.createGraphs = function (interpolations) {
        var gui = this;
        var result = [];
        for (var i = 0, l = interpolations.length; i < l; i++)
            result.push(new Graph(interpolations[i], this.canvas, this.center, this.zoom, this.colors[i], function (x, f) { return gui.toScreenCoordinates(x, f); }));
        return result;
    };
    
    this.drawTablePoints = function () {
        this.canvas.strokeStyle = this.canvas.fillStyle = this.colors[2];
        for (var i = 0, l = this.table.x.length; i < l; i++) {
            var point = this.toScreenCoordinates(this.table.x[i], this.table.f[i]);
            this.canvas.beginPath();
            this.canvas.arc(point.x, point.f, 5, 0, Math.PI * 2);
		    this.canvas.closePath();
            this.canvas.stroke();
            this.canvas.fill();
        }   
            
    };
    
    this.toPixel = function (value) {
        return parseInt(value * this.zoom);
    };

    this.toScreenCoordinates = function (x, f) {
        return { x: this.toPixel(x) + this.center.x, f: this.center.y - this.toPixel(f) };
    };
}).call(GUI.prototype);