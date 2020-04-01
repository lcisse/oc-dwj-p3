class Canvas {
    constructor(){
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDown = 0;
        // Keep track of the old/last position when drawing a line
        // We set it to -1 at the start to indicate that we don't have a good value for it yet
        this.lastX = -1;
        this.lastY = -1;
        // Get the specific canvas element from the HTML document
        this.canvasSign = document.getElementById('canvas-sign');
        this.ctx = this.canvasSign.getContext('2d'); 
        console.log('constructor',this.ctx)
    }

    getContext(){
        return this.ctx
    }
    
    // Set-up the canvas and add our event handlers after the page has loaded
    init(){
        // React to mouse events on the canvas, and mouseup on the entire document
        this.canvasSign.addEventListener('mousedown', this.sketchpad_mouseDown.bind(this), false);
        this.canvasSign.addEventListener('mousemove', this.sketchpad_mouseMove.bind(this), false);
        this.canvasSign.addEventListener('mouseup', this.sketchpad_mouseUp.bind(this), false);
        // Reset the canvas on click "Effacer"
        // Méthode 3 on bind une fonction anonyme
        $('#erase').on('click', function () {        
            this.ctx.clearRect(0, 0, this.canvasSign.width, this.canvasSign.height);     
        }.bind(this));
    }
    // Draws a line between the specified position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    drawLine(ctx, x, y, size){
        // If lastX is not set, set lastX and lastY to the current position
        if (this.lastX == -1) {
            this.lastX = x;
            this.lastY = y;
        }
        // Select a fill style
        this.ctx.strokeStyle = "#badc58";
        // Set the line "cap" style to round, so lines at different angles can join into each other
        this.ctx.lineCap = "round";
        //ctx.lineJoin = "round";
        // Draw a filled line
        this.ctx.beginPath();
        // First, move to the old (previous) position
        this.ctx.moveTo(this.lastX, this.lastY);
        // Now draw a line to the current touch/pointer position
        this.ctx.lineTo(x, y);
        // Set the line thickness and draw the line
        this.ctx.lineWidth = size;
        this.ctx.stroke();
        this.ctx.closePath();
        // Update the last position to reference the current position
        this.lastX = x;
        this.lastY = y;
    }

    sketchpad_mouseDown(){
        this.mouseDown = 1;
        this.drawLine(this.ctx, this.mouseX, this.mouseY, 4);
        $('#submit').prop('disabled', false);  //faire apparaitre le bouton valider en signant
    }

    sketchpad_mouseUp(){
        this.mouseDown = 0;
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        this.lastX = -1;
        this.lastY = -1;
    }

    sketchpad_mouseMove(e){
        // Update the mouse co-ordinates when moved
        this.getMousePos(e);
        // Draw a dot if the mouse button is currently being pressed
        if (this.mouseDown == 1) {
            this.drawLine(this.ctx, this.mouseX, this.mouseY, 2);
        }
    }

    // Get the current mouse position relative to the top-left of the canvas
    getMousePos(e) {
        if (!e)
            var e = event;
        if (e.offsetX) {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        } else if (e.layerX) {
            this.mouseX = e.layerX;
            this.mouseY = e.layerY;
        }
    }
}
//Fin de la class canvas
 

