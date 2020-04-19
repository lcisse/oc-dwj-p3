class Canvas {
    constructor(){
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDown = 0;
        // Keep track of the old/last position when drawing a line
        // -1 at the start to indicate that we don't have a good value for it yet
        this.lastX = -1;
        this.lastY = -1;
        // Variables to keep track of the touch position
        this.touchX= 0;
        this.touchY= 0;
        // Get the specific canvas element from the HTML document
        this.canvasSign = document.getElementById('canvas-sign');
        this.ctx = this.canvasSign.getContext('2d'); 
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

        // React to touch events on the canvas
        this.canvasSign.addEventListener('touchstart', this.sketchpad_touchStart.bind(this), false);
        this.canvasSign.addEventListener('touchend', this.sketchpad_touchEnd.bind(this), false);
        this.canvasSign.addEventListener('touchmove', this.sketchpad_touchMove.bind(this), false);
        // Reset the canvas on click "Effacer"
        $('#erase').on('click', function () {        
            this.ctx.clearRect(0, 0, this.canvasSign.width, this.canvasSign.height);     
        }.bind(this));

        $("#annuler").on("click", function(){ //quand la revertion est annulée
            this.ctx.clearRect(0, 0, this.canvasSign.width, this.canvasSign.height);
        }.bind(this));

        $("#submit").on("click", function(){
            this.ctx.clearRect(0, 0, this.canvasSign.width, this.canvasSign.height);
          }.bind(this));
    }

    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    drawLine(ctx, x, y, size){
        // If lastX is not set, set lastX and lastY to the current position
        if (this.lastX == -1) {
            this.lastX = x;
            this.lastY = y;
        }        
        this.ctx.strokeStyle = "#badc58"; // Select a fill style
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY); // First, move to the old (previous) position
        this.ctx.lineTo(x, y); // Now draw a line to the current touch/pointer position
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
    }

    sketchpad_mouseUp(){
        this.mouseDown = 0;
        // Reset lastX and lastY to -1 to indicate that they are now invalid
        this.lastX = -1;
        this.lastY = -1;
    }

    sketchpad_mouseMove(e){
        // Update the mouse co-ordinates when moved
        this.getMousePos(e);
        // Draw a dot if the mouse button is currently being pressed
        if (this.mouseDown == 1) {
            this.drawLine(this.ctx, this.mouseX, this.mouseY, 2);
            $('#submit').prop('disabled', false);  //Rendre le bouton valider cliquable aprés avoir signer
        }
    }

    // Get the current mouse position relative to the top-left of the canvas
    getMousePos(e) {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY; 
    }

    sketchpad_touchStart(e){
        // Update the touch co-ordinates
        this.getTouchPos(e);
        this.drawLine(this.ctx, this.touchX, this.touchY, 4);
        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    sketchpad_touchEnd(){
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        this.lastX = -1;
        this.lastY = -1;
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    sketchpad_touchMove(e){
        // Update the touch co-ordinates
        this.getTouchPos(e);
        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        this.drawLine(this.ctx, this.touchX, this.touchY, 4);
        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
        $('#submit').prop('disabled', false);  //Rendre le bouton valider cliquable aprés avoir signer
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    getTouchPos(e){
        var touch = e.touches[0]; // Get the information for finger #1
        this.touchX = touch.pageX - touch.target.offsetLeft;
        this.touchY = touch.pageY - touch.target.offsetTop;
    }
}
//Fin de la class canvas