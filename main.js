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
	var arrowSprite = new Image();
	arrowSprite.src = 'assets/sprites/arrow.png';
	var gammaOutput = $('#gammaOutput');
	var betaOutput = $('#betaOutput');
	var mainCanvas = $('#mainCanvas');
	var mainContext = mainCanvas.getContext('2d');
	
	
	function devMotionHandler(e){
		//handles the device orientation event.
		tiltLR = Math.floor(e.rotationRate.gamma);
		tiltFB = Math.floor(e.rotationRate.beta);
		dir = e.rotationRate.alpha;
		
		ax = e.acceleration.x;
		ay = e.acceleration.y;
		
		productAngle = Math.atan2(ay, ax);
		
		gammaOutput.innerHTML = "Device Left/Right Tilt: "+tiltLR;
		betaOutput.innerHTML = "Device Front/Back Tilt: "+tiltFB;
		
		
		//draws the canvas with arrow
		mainContext.clearRect(0,0,mainCanvas.width, mainCanvas.height);
		
		mainContext.save();
		mainContext.translate(mainCanvas.width/2-100, mainCanvas.height/2)
		mainContext.rotate(productAngle);
		mainContext.drawImage(arrowSprite, 0, 0);
		mainContext.restore();
		
	}
	//end of motion app
	
	function $(selector){
		return document.querySelector(selector);
	}
	
}



