window.addEventListener('load', onWindowLoad, false);

function onWindowLoad(){
	motionApp();
}

function motionApp(){
	if(window.DeviceOrientationEvent){
		//browser supports device orientation. add listneer
	window.addEventListener('devicemotion', devMotionHandler, false);
	}
	
	var tiltLR;
	var tiltFB;
	var ax;
	var ay;
	var dir;
	
	var productAngle = 0;
	var shipSprite = new Image();
	shipSprite.src = 'assets/sprites/ship.png';
	var gammaOutput = $('#gammaOutput');
	var betaOutput = $('#betaOutput');
	var mainCanvas = $('#mainCanvas');
	var mainContext = mainCanvas.getContext('2d');
	
	var ship = {x:425, y:240, velX:0, velY:0, thrust:0.25, width:35, height:28, angle:0};
	
	
	setInterval(function(){
				//draws the canvas with ship
		mainContext.fillStyle = '#000';
		mainContext.fillRect(0,0,mainCanvas.width, mainCanvas.height);
	
		
		
		
		ship.x += ship.velX;
		ship.y += ship.velY;
		
			
		
		mainContext.save();
		mainContext.translate(ship.x, ship.y);
		mainContext.rotate(ship.angle);
		mainContext.drawImage(shipSprite, 0-ship.width/2, 0-ship.height/2);
		mainContext.restore();
	
		
	}, 25);
	
	
	
	function devMotionHandler(e){
		//handles the device orientation event.
		tiltLR = e.rotationRate.gamma;
		tiltFB = e.rotationRate.beta;
		dir = e.rotationRate.alpha;
		
		var futureVelX, futureVelY, futureVel;
		
		ax = e.accelerationIncludingGravity.x;
		ay = e.accelerationIncludingGravity.y;
		
		var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
		if (landscapeOrientation) {
			futureVelX = ship.velX+ax;
			futureVelY = ship.velY+ay;
		} else {
			futureVelX = ship.velX+ax;
			futureVelY = ship.velY-ay;
		}
		
		futureVel = Math.sqrt(futureVelX*futureVelX + futureVelY*futureVelY);
		if(futureVel >= 4){
			ship.velX = ship.velX;
			ship.velY = ship.velY
		}else{
			ship.velX = futureVelX;
			ship.velY = futureVelY;
		}
	
		ship.angle = Math.atan2(ship.velY, ship.velX);
		
		gammaOutput.innerHTML = "Device Left/Right Tilt: "+tiltLR;
		betaOutput.innerHTML = "Device Front/Back Tilt: "+tiltFB;
		
	}
	//end of motion app
	
	function $(selector){
		return document.querySelector(selector);
	}
	
}



