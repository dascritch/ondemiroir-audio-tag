"use strict";

/*
	TimecodeHash , an extension to the hash system to address timecode into audio/video elements
    Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

	--

	project repository : https://github.com/dascritch/timecodehash
	professional : http://dascritch.com
    blog : http://dascritch.net


 */


function TimecodeHash(hashcode) {
	var funcs = {
		_units : { 
				'd' : 86400,
				'h' : 3600,
				'm' : 60,
				's' : 1
		},
		separator : '@',
		convertTimeInSeconds : function(givenTime) {
			var seconds = 0;
			if (/^\d+$/.test(givenTime)) {
				seconds = Number(givenTime);
			} else {
				seconds = givenTime.indexOf(':') === -1 ? this.convertSubunitTimeInSeconds(givenTime) : this.convertColonTimeInSeconds(givenTime) ;
			}
			return seconds;
		},
		convertSubunitTimeInSeconds : function(givenTime) {
			var seconds = 0;
			for(var key in this._units) {
				if ( (this._units.hasOwnProperty(key)) && (givenTime.indexOf(key) !== -1) ) {
					var atoms = givenTime.split(key);
					seconds += Number(atoms[0].replace(/\D*/g,'' )) * this._units[key];
					givenTime = atoms[1];
				}
			}
			return seconds;
		},
		convertColonTimeInSeconds : function(givenTime) {
			var seconds = 0;
			var atoms = givenTime.split(':');
			var convert = [ 1 , 60 , 3600 , 86400 ]
			for (var pos = 0 ; pos < atoms.length ; pos++ ) {
				seconds += Number(atoms[pos]) * convert[((atoms.length-1) - pos)];
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

			if (hashcode.indexOf(this.separator) === -1) {
				return ;
			}

			var atoms = hashcode.split(this.separator);
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