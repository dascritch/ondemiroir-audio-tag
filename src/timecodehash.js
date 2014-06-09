"use strict";

function TimecodeHash() {
	var units = { 
				's' : 1,
				'm' : 60,
				'h' : 3600,
				'd' : 86400,
			};
	this.convertTimeInSeconds = function(givenTime) {
		var seconds = 0;
		if (/^\d+$/.test(givenTime)) {
			seconds = Number(givenTime);
		} else {
			for(var key in units) {
				if (units.hasOwnProperty(key)) {
					var sub = new RegExp('^(.*)(\\d+)'+key+'(.*)$');
					if (sub.test(givenTime)) {
						seconds += Number(givenTime.replace(sub,'$2' )) * units[key];
					}
				}
			}
		}
		return seconds;
	}

	this.jumpElementAt = function(hash,timecode) {
		var el = document.getElementById(hash);
		if ((el === undefined) || (el.currentTime === undefined)) {
			return false;
		}
		el.currentTime = this.convertTimeInSeconds(timecode);
		el.play();
	}

	this.hashOrder = function(hashcode){
		if (!/@/.test(hashcode)) {
			return ;
		}
		var atoms = hashcode.split('@');
		this.jumpElementAt(atoms[0],atoms[1]);
	}
}

