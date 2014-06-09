"use strict";

function TimecodeHash(hashcode) {
	var units = { 
				'd' : 86400,
				'h' : 3600,
				'm' : 60,
				's' : 1
			};
	var funcs = {
		convertTimeInSeconds : function(givenTime) {
			var seconds = 0;
			if (/^\d+$/.test(givenTime)) {
				seconds = Number(givenTime);
			} else {
				for(var key in units) {
					if ( (units.hasOwnProperty(key)) && (givenTime.indexOf(key) !== -1) ) {
						var atoms = givenTime.split(key);
						seconds += Number(atoms[0].replace(/\D*/g,'' )) * units[key];
						givenTime = atoms[1];
					}
				}
			}
			return seconds;
		},
		jumpElementAt : function(hash,timecode) {
			var el;

			if (hash !== '') {
				el = document.getElementById(hash);
			} else {
				el = (document.querySelector !== undefined) ? document.querySelector('audio,video') : undefined;
			}
			if ((el === undefined) || (el.currentTime === undefined)) {
				return false;
			}
			el.currentTime = this.convertTimeInSeconds(timecode);
			el.play();
		},
		hashOrder : function(hashcode){
			if (typeof hashcode !== 'string') {
				hashcode = window.location.hash.substr(1);
			}

			if (!/@/.test(hashcode)) {
				return ;
			}

			var atoms = hashcode.split('@');
			this.jumpElementAt(atoms[0],atoms[1]);
		}
	};

	if (hashcode !== undefined) {
		funcs.hashOrder(hashcode);
	}

	return funcs;
}

(function(window,TimecodeHash){
	function addEvent(element, event, fn) {
		// gono too fast, ^c^v from http://stackoverflow.com/questions/15564029/adding-to-window-onload-event
	    if (element.addEventListener) {
	        element.addEventListener(event, fn, false);
	    } else { 
	    	if (element.attachEvent) element.attachEvent('on' + event, fn);
		}
	}

	addEvent(window, 'load', TimecodeHash);
	if ("onhashchange" in window) {
		addEvent(window, 'hashchange', TimecodeHash);
	}
})(window,TimecodeHash);