function displayCanvas(){
    const canvasHTML = document.getElementById('myCanvas');
    const contextHTML = canvasHTML.getContext('2d');
    contextHTML.strokeRect(0,0,canvasHTML.width, canvasHTML.height);
	
    const radiusClock = canvasHTML.width/2 - 10;
    const xCenterClock = canvasHTML.width/2;
    const yCenterClock = canvasHTML.height/2;
	
    contextHTML.fillStyle = "#ffffff";
    contextHTML.fillRect(0,0,canvasHTML.width,canvasHTML.height);
	
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 1;
    contextHTML.beginPath();
    contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.stroke();
    contextHTML.closePath();
	
    let radiusNum = radiusClock - 10; 	
    let radiusPoint;
    for(let tm = 0; tm < 60; tm++){
	  contextHTML.beginPath();
	  if(tm % 5 == 0){radiusPoint = 5;}else{radiusPoint = 2;} 
	  let xPointM = xCenterClock + radiusNum * Math.cos(-6*tm*(Math.PI/180) + Math.PI/2);
	  let yPointM = yCenterClock - radiusNum * Math.sin(-6*tm*(Math.PI/180) + Math.PI/2);
	  contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
	  contextHTML.stroke();
	  contextHTML.closePath();
    } 
	
    for(let th = 1; th <= 12; th++){
	contextHTML.beginPath();
	contextHTML.font = 'bold 25px sans-serif';
	let xText = xCenterClock + (radiusNum - 30) * Math.cos(-30*th*(Math.PI/180) + Math.PI/2);
	let yText = yCenterClock - (radiusNum - 30) * Math.sin(-30*th*(Math.PI/180) + Math.PI/2);
	if(th <= 9){
		contextHTML.strokeText(th, xText - 5 , yText + 10);
	}else{
		contextHTML.strokeText(th, xText - 15 , yText + 10);
	}
     	contextHTML.stroke();
	contextHTML.closePath();	
    }

	
    let lengthSeconds = radiusNum - 10;
    let lengthMinutes = radiusNum - 15;
    let lengthHour = lengthMinutes / 1.5;
    let d = new Date();                
    let t_sec = 6*d.getSeconds();                           
    let t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds()); 
    let t_hour = 30*(d.getHours() + (1/60)*d.getMinutes()); 
	
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#FF0000";
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthSeconds*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
	yCenterClock - lengthSeconds*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 3;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthMinutes*Math.cos(Math.PI/2 - t_min*(Math.PI/180)),
    yCenterClock - lengthMinutes*Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    contextHTML.beginPath();
    contextHTML.lineWidth = 5;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthHour*Math.cos(Math.PI/2 - t_hour*(Math.PI/180)),
				 yCenterClock - lengthHour*Math.sin(Math.PI/2 - t_hour*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();	
	
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.fillStyle = "#ffffff";
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();
}


window.onload = function() {
    window.setInterval(
        function() {
            let d = new Date();
            document.getElementById("clock").innerHTML = d.toLocaleTimeString();
            displayCanvas();
        }
    , 1000);
}
