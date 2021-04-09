var canvas = document.getElementById("platno");
var ctx = canvas.getContext("2d");

var MicR = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var padloHeight = 10;
var padloWidth = 75;
var padloX = (canvas.width-padloWidth)/2;

var rightPressed = false;
var leftPressed = false;

var CihlaRowCount = 4;
var CihlaColumnCount = 7;
var CihlaWidth = 50;
var CihlaHeight = 20;
var CihlaPadding = 10;
var CihlaOffsetTop = 30;
var CihlaOffsetLeft = 30;
var Cihly = [];


for(var c=0; c<CihlaColumnCount; c++) {
    Cihly[c] = [];
    for(var r=0; r<CihlaRowCount; r++) {
        Cihly[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawMic() {
    ctx.beginPath();
    ctx.arc(x, y, MicR, 0, Math.PI*2);
    ctx.fillStyle = "#FED323";
    ctx.fill();
    ctx.closePath();
}
function drawPadlo() {
    ctx.beginPath();
    ctx.rect(padloX, canvas.height-padloHeight, padloWidth, padloHeight);
    ctx.fillStyle = "#AC01D6";
    ctx.fill();
    ctx.closePath();
}
function drawCihly() {
    for(var c=0; c<CihlaColumnCount; c++) {
        for(var r=0; r<CihlaRowCount; r++) {
          if(Cihly[c][r].status == 1) {
            var CihlaX = (c*(CihlaWidth+CihlaPadding))+CihlaOffsetLeft;
            var CihlaY = (r*(CihlaHeight+CihlaPadding))+CihlaOffsetTop;
            Cihly[c][r].x = CihlaX;
            Cihly[c][r].y = CihlaY;

            ctx.beginPath();
            ctx.rect(CihlaX, CihlaY, CihlaWidth, CihlaHeight);
            ctx.fillStyle = "#32FF00";
            ctx.fill();
            ctx.closePath();
        }
    }
  }
}
function Detekce() {
    for(var c=0; c<CihlaColumnCount; c++) {
        for(var r=0; r<CihlaRowCount; r++) {
            var b = Cihly[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+CihlaWidth && y > b.y && y < b.y+CihlaHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCihly();
    drawMic();
    drawPadlo();
    Detekce();

   
    
    if(x + dx > canvas.width-MicR || x + dx < MicR) {
        dx = -dx;
    }
    if(y + dy < MicR) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-MicR) {
        if(x > padloX && x < padloX + padloWidth) {
           if(y= y-padloHeight){
            dy = -dy  ;
			 }
        }
        else {
            //alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); 
        }
    }
    
    if(rightPressed && padloX < canvas.width-padloWidth) {
        padloX += 7;
    }
    else if(leftPressed && padloX > 0) {
        padloX -= 7;
    }
    
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);
