window.addEventListener('load', onWindowLoad, false);

function onWindowLoad(){
	motionApp();
}

function motionApp(){
	if(window.DeviceOrientationEvent){
		//browser supports device orientation. add listneer
	window.addEventListener('deviceorientation', devOrientationHandler, false);
	}
	
	var tiltLR;
	var tiltFB;
	var dir;
	
	var gammaOutput = $('#gammaOutput');
	var betaOutput = $('#betaOutput');
	
	function devOrientationHandler(e){
		//handles the device orientation event.
		tiltLR = e.gamma;
		tiltFB = e.beta;
		dir = e.alpha;
		
		gammaOutput.innerHTML = "Device Left/Right Tilt: "+tiltLR;
		betaOutput.innerHTML = "Device Front/Back Tilt: "+tiltFB;
		
	}
	//end of motion app
	
	function $(selector){
		return document.querySelector(selector);
	}
	
}



