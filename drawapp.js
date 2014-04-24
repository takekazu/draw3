var cElem, cCont, late, x_max, y_max;
var drawing = false;  // flag = false

//when pege loaded..
window.addEventListener('load', function(){
    cElem = document.getElementById('c');
    cCont = cElem.getContext('2d');
    late = 0;	// but  default iPad latency is 30ms
	x_max = 0;
	y_max = 0;
	
    // canvas setting
    cCont.lineJoin    = 'round';  // shape_angle
    cCont.lineCap     = 'round';  // shape_line end
    cCont.lineWidth   = 3;        // line width
    cCont.strokeStyle = '#0000FF';   // line color

    // event
    cElem.addEventListener('touchstart', start, false);  // call start() when touchstart event on canvas
    cElem.addEventListener('touchmove', move, false);   // call move() when touchstart event on canvas
    cElem.addEventListener('touchend', stop, false);
    cElem.addEventListener('touchleave', stop, false);

	// stop to page scroll
	document.body.addEventListener('touchmove', function(event){
		event.preventDefault();
	}, false);
}, false);

function start(event){
    // application code executed in this function are packed as below callback.
    var initX = event.touches[0].pageX - c.offsetLeft - x_max;
    var initY = event.touches[0].pageY - c.offsetTop - y_max;
    var callBack = function(){
        cCont.beginPath();
        cCont.moveTo(initX, initY);
        drawing = true;
    };
    // emulating event passed to application code "late" millisecs after user operation.
    setTimeout(callBack, late);
}

function move(event){
    // application code executed in this function are packed as below callback.
    var lineDestX = event.touches[0].pageX - c.offsetLeft - x_max;
    var lineDestY = event.touches[0].pageY - c.offsetTop - y_max;
    var callBack = function(){
        if (!drawing) return;
        cCont.lineTo(lineDestX, lineDestY);
        cCont.stroke();
    };
    // emulating event passed to application code "late" millisecs after user operation.
	setTimeout(callBack, late);
}

function stop(event){
    // application code executed in this function are packed as below callback.
    var callBack = function(){
        if (!drawing) return;
        cCont.closePath();
        drawing = false;
    };
    // emulating event passed to application code "late" millisecs after user operation.
    setTimeout(callBack, late);
}

function clearCanvas(){
    cCont.clearRect(0, 0, c.width, c.height);  // initialize canvas
}

function sampling(){  // sampling
	d = new Date();
	m = d.getMinutes();
	s = d.getSeconds();
	ms = d.getMilliseconds();
	document.getElementById("t").value = (m + ":" + s + ":" + ms + ", ");
	console.log(m + ":" + s + ":" + ms + ", ");  // log_minute, sec, msec
}

function changePensize(){  // change line width
	pElem = document.getElementsByName('pen');
	if(pElem[0].checked){
		cCont.lineWidth = 1;
	}
	else if(pElem[1].checked){
		cCont.lineWidth = 3;
	}
	else if(pElem[2].checked){
		cCont.lineWidth = 5;
	}
}

function changeLatency(){  // change stroke latency
	lElem = document.getElementsByName('latency');
	if(lElem[0].checked){
		late = 0;
	}
	else if(lElem[1].checked){
		late = 10;
	}
	else if(lElem[2].checked){
		late = 20;
	}
	else if(lElem[3].checked){
		late = 30;
	}
	else if(lElem[4].checked){
		late = 40;
	}
	else if(lElem[5].checked){
		late = 50;
	}
	else if(lElem[6].checked){
		late = 60;
	}
	else if(lElem[7].checked){
		late = 70;
	}
	else if(lElem[8].checked){
		late = 80;
	}
	else if(lElem[9].checked){
		late = 90;
	}
	else if(lElem[10].checked){
		late = 100;
	}
	else if(lElem[11].checked){
		late = 110;
	}
	else if(lElem[12].checked){
		late = 160;
	}
	else if(lElem[13].checked){
		late = 210;
	}
}

function setCalibration(){		//  calibration
	x_max = -document.getElementById("calib_x").value;
	y_max = document.getElementById("calib_y").value;
}

