
class Canvas {
    constructor(){
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseDown = 0;
        // Variables to keep track of the touch position
        this.touchX = 0;
        this.touchY = 0;
        // Keep track of the old/last position when drawing a line
        // We set it to -1 at the start to indicate that we don't have a good value for it yet
        this.lastX = -1;
        this.lastY = -1;
        this.canvasSign = document.getElementById('canvas-sign');
        this.ctx = this.canvasSign.getContext('2d'); 
    }
    
    // Set-up the canvas and add our event handlers after the page has loaded
    init(){
        // Get the specific canvas element from the HTML document
        //var canvasSign = document.getElementById('canvas-sign');
        

        //document.getElementById('submit').style.display = "none";

        // React to mouse events on the canvas, and mouseup on the entire document
        this.canvasSign.addEventListener('mousedown', this.sketchpad_mouseDown, false);
        this.canvasSign.addEventListener('mousemove', this.sketchpad_mouseMove, false);
        window.addEventListener('mouseup', this.sketchpad_mouseUp, false);

        // React to touch events on the canvas
        this.canvasSign.addEventListener('touchstart', this.sketchpad_touchStart, false);
        this.canvasSign.addEventListener('touchend', this.sketchpad_touchEnd, false);
        this.canvasSign.addEventListener('touchmove', this.sketchpad_touchMove, false);

        // Reset the canvas on click "Effacer"
        document.getElementById('erase').addEventListener('click', function () {
            this.ctx.clearRect(0, 0, this.canvasSign.width, this.canvasSign.height);
            //document.getElementById('submit').style.display = "none";
        });

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

    sketchpad_mouseMove(){
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

    // Draw something when a touch start is detected
    sketchpad_touchStart(e) {
        // Update the touch co-ordinates
        this.getTouchPos();
        this.drawLine(this.ctx, this.touchX, this.touchY, 4);
        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    sketchpad_touchEnd() {
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        this.lastX = -1;
        this.lastY = -1;
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    sketchpad_touchMove(e) {
        // Update the touch co-ordinates
        this.getTouchPos(e);
        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        this.drawLine(this.ctx, this.touchX, this.touchY, 4);
        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    getTouchPos(e) {
        if (!e)
            var e = event;

        if (e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                this.touchX = touch.pageX - touch.target.offsetLeft;
                this.touchY = touch.pageY - touch.target.offsetTop;
            }
        }
    }


}

//Fin de la class canvas

 
$(document).ready(function () {
    var canvas = new Canvas();
    canvas.init();
    canvas.drawLine();
    canvas.sketchpad_mouseDown();
    canvas.sketchpad_mouseUp();
    canvas.sketchpad_mouseMove();
    canvas.getMousePos(e);
    canvas.sketchpad_touchStart(e);
    canvas.sketchpad_touchEnd();
    canvas.sketchpad_touchMove(e);
    canvas.getTouchPos(e) ;
});









/*

    var CanvasForSign = {

    // Variables to keep track of the mouse position and left-button status
    mouseX: 0,
    mouseY: 0,
    mouseDown: 0,

    // Variables to keep track of the touch position
    touchX: 0,
    touchY: 0,

    // Keep track of the old/last position when drawing a line
    // We set it to -1 at the start to indicate that we don't have a good value for it yet
    lastX: -1,
    lastY: -1,

    // Set-up the canvas and add our event handlers after the page has loaded
    init: function () {
        // Get the specific canvas element from the HTML document
        var canvasSign = document.getElementById('canvas-sign');
        ctx = canvasSign.getContext('2d');

        //document.getElementById('submit').style.display = "none";

        // React to mouse events on the canvas, and mouseup on the entire document
        canvasSign.addEventListener('mousedown', CanvasForSign.sketchpad_mouseDown, false);
        canvasSign.addEventListener('mousemove', CanvasForSign.sketchpad_mouseMove, false);
        window.addEventListener('mouseup', CanvasForSign.sketchpad_mouseUp, false);

        // React to touch events on the canvas
        canvasSign.addEventListener('touchstart', CanvasForSign.sketchpad_touchStart, false);
        canvasSign.addEventListener('touchend', CanvasForSign.sketchpad_touchEnd, false);
        canvasSign.addEventListener('touchmove', CanvasForSign.sketchpad_touchMove, false);

        // Reset the canvas on click "Effacer"
        document.getElementById('erase').addEventListener('click', function () {
            ctx.clearRect(0, 0, canvasSign.width, canvasSign.height);
            //document.getElementById('submit').style.display = "none";
        });

    },

    // Draws a line between the specified position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    drawLine: function (ctx, x, y, size) {

        // If lastX is not set, set lastX and lastY to the current position
        if (CanvasForSign.lastX == -1) {
            CanvasForSign.lastX = x;
            CanvasForSign.lastY = y;
        }

        // Select a fill style
        ctx.strokeStyle = "#badc58";

        // Set the line "cap" style to round, so lines at different angles can join into each other
        ctx.lineCap = "round";
        //ctx.lineJoin = "round";


        // Draw a filled line
        ctx.beginPath();

        // First, move to the old (previous) position
        ctx.moveTo(CanvasForSign.lastX, CanvasForSign.lastY);

        // Now draw a line to the current touch/pointer position
        ctx.lineTo(x, y);

        // Set the line thickness and draw the line
        ctx.lineWidth = size;
        ctx.stroke();

        ctx.closePath();

        // Update the last position to reference the current position
        CanvasForSign.lastX = x;
        CanvasForSign.lastY = y;

        //document.getElementById('submit').style.display = "block";
    },



    // Keep track of the mouse button being pressed and draw a dot at current location
    sketchpad_mouseDown: function () {
        CanvasForSign.mouseDown = 1;
        CanvasForSign.drawLine(ctx, CanvasForSign.mouseX, CanvasForSign.mouseY, 4);
     
        $('#submit').prop('disabled', false);  //faire apparaitre le bouton valider en signant

    },


    // Keep track of the mouse button being released
    sketchpad_mouseUp: function () {
        CanvasForSign.mouseDown = 0;

        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        CanvasForSign.lastX = -1;
        CanvasForSign.lastY = -1;
    },

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    sketchpad_mouseMove: function (e) {
        // Update the mouse co-ordinates when moved
        CanvasForSign.getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (CanvasForSign.mouseDown == 1) {
            CanvasForSign.drawLine(ctx, CanvasForSign.mouseX, CanvasForSign.mouseY, 2);
        }
    },

    // Get the current mouse position relative to the top-left of the canvas
    getMousePos: function (e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            CanvasForSign.mouseX = e.offsetX;
            CanvasForSign.mouseY = e.offsetY;
        } else if (e.layerX) {
            CanvasForSign.mouseX = e.layerX;
            CanvasForSign.mouseY = e.layerY;
        }
    },

    // Draw something when a touch start is detected
    sketchpad_touchStart: function (e) {
        // Update the touch co-ordinates
        CanvasForSign.getTouchPos();

        CanvasForSign.drawLine(ctx, CanvasForSign.touchX, CanvasForSign.touchY, 4);

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    },

    sketchpad_touchEnd: function () {
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        CanvasForSign.lastX = -1;
        CanvasForSign.lastY = -1;
    },

    // Draw something and prevent the default scrolling when touch movement is detected
    sketchpad_touchMove: function (e) {
        // Update the touch co-ordinates
        CanvasForSign.getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        CanvasForSign.drawLine(ctx, CanvasForSign.touchX, CanvasForSign.touchY, 4);

        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    },

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    getTouchPos: function (e) {
        if (!e)
            var e = event;

        if (e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                CanvasForSign.touchX = touch.pageX - touch.target.offsetLeft;
                CanvasForSign.touchY = touch.pageY - touch.target.offsetTop;
            }
        }
    },
}

$(document).ready(function () {
    CanvasForSign.init();
});
*/