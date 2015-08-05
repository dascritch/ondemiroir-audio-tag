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
	blog post : http://dascritch.net/post/2014/09/03/Timecodehash-%3A-Lier-vers-un-moment-d-un-sonore

 */

window.OndeMiroirAudio = function() {
	'use strict';

	if ( (document.querySelector === undefined) || (!('oncanplay' in window)) ) {
		// don't even think about it : probably MSIE < 8
		return;
	}

	var _units = {
		'd' : 86400,
		'h' : 3600,
		'm' : 60,
		's' : 1
	};

	function onDebug(callback_fx) {
		// this is needed for testing, as we now run in async tests
		if (typeof callback_fx === 'function') {
			callback_fx();
		}
	}

	var self = {
		separator : '&t=',
		selector : 'audio[controls]',
		dynamicallyAllocatedIdPrefix : 'OndeMiroirAudio-',
		menuId : 'OndeMiroirAudio-menu',
		styleId : 'OndeMiroirAudio-style',
		style : ' .OndeMiroirAudio-Player {  border : 2px solid yellow ; display : flex} \
		.OndeMiroirAudio-Player-cover { flex: 0 0 64px; height : 64px } .OndeMiroirAudio-Player-cover img { width : 100%  } ',
		container :  {
			tagname :'div',
			idPrefix : 'OndeMiroirAudio-Player-',
			classname : 'OndeMiroirAudio-Player',
		},
		playbutton : {
			play : '▶',
			pause : '▮▮',
		},
		template : '<div class="{{classname}}-cover"><img src="{{poster}}" alt="{{cover}}" /></div>\
			<div class="{{classname}}-play">play</div>\
			<div><div><a href="{{canonical}}#">{{title}}</a></div><div>elapsed</div></div>\
			<div>timeline</div>\
			<div class="{{classname}}-actions">and more</div>',
		poster_fallback : 'http://dascritch.net/themes/DSN13/img/entete1.svg',
		__ : {
			'(no title)' : '(sans titre)',
			'cover' : 'pochette'
		},
		count_element : 0,
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
			for(var key in _units) {
				if ( (_units.hasOwnProperty(key)) && (givenTime.indexOf(key) !== -1) ) {
					var atoms = givenTime.split(key);
					seconds += Number(atoms[0].replace(/\D*/g,'' )) * _units[key];
					givenTime = atoms[1];
				}
			}
			return seconds;
		},
		convertColonTimeInSeconds : function(givenTime) {
			var seconds = 0;
			var atoms = givenTime.split(':');
			var convert = [1, 60, 3600, 86400];
			for (var pos = 0 ; pos < atoms.length ; pos++ ) {
				seconds += Number(atoms[pos]) * convert[((atoms.length-1) - pos)];
			}
			return seconds;
		},
		convertSecondsInTime : function(givenSeconds) {
			var converted = '';
			for(var key in _units) {
				if (_units.hasOwnProperty(key)) {
					var multiply = _units[key];
					if (givenSeconds >= multiply) {
						var digits = Math.floor(givenSeconds / multiply);
						converted += digits + key;
						givenSeconds -= digits * multiply;
					}
				}
			}
			if (converted === '') {
				converted = '0s';
			}
			return converted;
		},
		jumpElementAt : function(hash,timecode,callback_fx) {
			var el;
			function _isEvent(e) {
				return e.preventDefault !== undefined;
			}

			function do_element_play(e) {
				var tag = e.target;
				tag.play();
				if (_isEvent(e)) {
					tag.removeEventListener('canplay', do_element_play, true);
				}
				onDebug(callback_fx);
			}

			function do_needle_move(e) {
				if (_isEvent(e)) {
					el.removeEventListener('loadedmetadata', do_needle_move, true);
				}

				var secs = self.convertTimeInSeconds(timecode);
				if (el.fastSeek !== undefined) {
					el.fastSeek(secs);
					// Firefox doesn't see fastSeek
				} else {
					try {
						// but can set currentTime
						el.currentTime = secs;
					} catch(e) {
						// exept sometimes, so you must use standard media fragment
						el.src = el.currentSrc.split('#')[0] + '#t=' + secs;
					}
				}

				if (el.readyState >= el.HAVE_FUTURE_DATA)  {
					do_element_play({ target : el });
				} else {
					el.addEventListener('canplay', do_element_play, true);
				}
			}

			el = (hash !== '') ? document.getElementById(hash) : document.querySelector(this.selector);

			if ((el === undefined) || (el.currentTime === undefined)) {
				return false;
			}

			if (el.readyState === el.HAVE_NOTHING ) {
				el.addEventListener('loadedmetadata', do_needle_move , true);
				el.load();
			} else {
				do_needle_move({});
			}

		},
		hashOrder : function(hashcode,callback_fx){
			if (typeof hashcode !== 'string') {
				hashcode = document.location.hash.substr(1);
			}

			if (hashcode.indexOf(self.separator) === -1) {
				onDebug(callback_fx);
				return ;
			}

			var atoms = hashcode.split(self.separator);
			self.jumpElementAt(atoms[0],atoms[1],callback_fx);
		},
		update_playbutton : function(event) {
			var element = event.target;
			element.id

		},
		populate_template : function(entry) {
			var inner = self.template;
			for (var key in entry) {
				if (entry.hasOwnProperty(key)) {
					inner = inner.replace(RegExp('{{'+key+'}}','g'), entry[key]);
				}
			}
			return inner;
		},
		element_attribute : function(element, key, missing) {
			return (element.attributes[key] === undefined) ? missing : element.attributes[key].value;
		},
		get_params_for_template : function(element) {
			return {
				// keys are stringed, as we need them not being modified
				'title'     : element.title === '' ? self.__['(no title)'] : element.title,
				'canonical' : element.dataset.canonical === undefined ? '' : element.dataset.canonical,
				'poster' : self.element_attribute(element,'poster', self.poster_fallback),
				'cover' : self.__['cover'],
				'classname' : self.container.classname
			}
		},
		build : function(element) {
			if (element.id === '') {
				element.id = self.dynamicallyAllocatedIdPrefix + String(self.count_element);
			}
			var zone = document.createElement(self.container.tagname)
			zone.id = self.container.idPrefix + String(self.count_element);
			zone.className = self.container.classname;
			zone.innerHTML = self.populate_template(self.get_params_for_template(element));
			element.parentNode.insertBefore(zone, element);

			var triggers = ['error','play','pause','suspend'];
			for (var pos in triggers) {
				if (triggers.hasOwnProperty(pos)) {
					element.addEventListener(triggers[pos],self.update_playbutton);
				}
			}

			self.count_element++;
		},

		insertStyle : function() {
			var element = document.createElement('style');
			element.id = self.styleId;
			element.innerHTML = self.style;
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(element);

		},
		launch : function() {
			if (document.getElementById(self.styleId) !== null) {
				// injected <style> is already there
				return ;
			}
			[].forEach.call(
				// explication de cette construction : https://coderwall.com/p/jcmzxw
				document.querySelectorAll(self.selector), self.build
			);
			self.insertStyle();
		}
	};


	if (document.body !== null) {
		self.launch();
	} else {
		document.addEventListener( 'readystatechange', self.launch, false);
	}
	window.addEventListener( 'hashchange', self.hashOrder, false);

	return self;
}();