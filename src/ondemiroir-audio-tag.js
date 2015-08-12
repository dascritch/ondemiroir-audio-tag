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

	if ( (document.querySelector === undefined) || (!('oncanplay' in window)) || (![].forEach) ) {
		// don't even think about it : probably MSIE < 8
		return undefined;
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

	var _style = `
.{{classname}} {
	background : #ddd;
	display : flex;
	font-family : Lato, "Open Sans", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
	border : none;
	padding : 0;
	margin : 0;
}
.{{classname}}-cover , .{{classname}}-play , .{{classname}}-pause {
	flex : 0 0 64px;
	height : 64px;
	text-align : center;
	vertical-align : middle;
} 
.{{classname}}-cover img {
	width : 100%;
}
.{{classname}}-play , .{{classname}}-pause , .{{classname}}-actions {
	cursor : pointer;
}
.{{classname}}-titleline {
	display : flex;
}
.{{classname}}-about, .{{classname}}-title {
	flex : 2 2 100%;
}
.{{classname}}-time {
	background : black;
	width : 100%;
	height : 10px;
	display : block;
	border-radius : 4px;
	position : relative;
}
.{{classname}}-elapsedline {
	background : white;
	height : 10px ;
	display : block ;
	position : absolute; 
	left : 0;
	border-radius : 4px;
	pointer-events : none;
}
.{{classname}}-pagemain, .{{classname}}-pageshare, .{{classname}}-share {
	flex : 2 2 100%;
	display : flex;
}
.{{classname}}-pageshare {
	display : none;
}
.{{classname}}-share a {
	flex : 2 0;
	color : white;
	text-decoration : none;
}
.{{classname}}-share img {
	vertical-align : middle;
}
.{{classname}}-twitter {background : #4DB5F4}
.{{classname}}-facebook {background : #5974CC}
.{{classname}}-googleplus {background : #E15646}
.{{classname}}-email {background : #1DCE9A}
.{{classname}}-link {background : #77F}
	`;

	var _template = `
<div class="{{classname}}-cover">
	<img src="{{poster}}" alt="{{cover}}" />
</div>
<div class="{{classname}}-pagemain">
	<div class="{{classname}}-play">▶</div><div class="{{classname}}-pause">▮▮</div>
	<div class="{{classname}}-about">
		<div class="{{classname}}-titleline">
			<div class="{{classname}}-title"><a href="{{canonical}}#">{{title}}</a></div>
			<div class="{{classname}}-elapse">elapsed</div>
		</div>
		<div>
			<div class="{{classname}}-time">
				<div class="{{classname}}-elapsedline"></div>
			</div>
		</div>
	</div>
	<div class="{{classname}}-actions">{{more}}</div>
</div>
<div class="{{classname}}-pageshare">
	<div class="{{classname}}-share">
		<a href="#" target="social" class="{{classname}}-twitter"><img src="{{svg_pictos}}#twitter" alt="" />{{twitter}}</a>
		<a href="#" target="social" class="{{classname}}-facebook"><img src="{{svg_pictos}}#facebook" alt="" />{{facebook}}</a>
		<a href="#" target="social" class="{{classname}}-googleplus"><img src="{{svg_pictos}}#googleplus" alt="" />{{googleplus}}</a>
		<a href="#" target="social" class="{{classname}}-email"><img src="{{svg_pictos}}#email" alt="" />{{e-mail}}</a>
		<a class="{{classname}}-playlist">{{playlist}}</a>
		<a href="#" target="social" class="{{classname}}-link">{{direct-link}}</a>
		<div class="{{classname}}-back">{{back}}</div>
	</div>
</div>
	`;

	var self = {
		dontHideAudioTag : true,
		separator : '&t=',
		selector : 'audio[controls]',
		dynamicallyAllocatedIdPrefix : 'OndeMiroirAudio-tag-',
		menuId : 'OndeMiroirAudio-menu',
		styleId : 'OndeMiroirAudio-style',
		container :  {
			tagname :'div',
			idPrefix : 'OndeMiroirAudio-Player-',
			classname : 'OndeMiroirAudio-Player',
		},
		poster_fallback : 'http://dascritch.net/themes/DSN13/img/entete1.svg',
		svg_pictos : './src/icones.svg',
		__ : {
			'(no title)' : '(sans titre)',
			'cover' : 'pochette',
			'more' : 'Partager',
			'twitter' : 'Partager sur Twitter',
			'facebook' : 'Partager sur Facebook',
			'googleplus' : 'Partager sur Google+',
			'e-mail' : 'Partager par e-mail',
			'playlist' : 'Écouter plus tard',
			'direct-link' : 'Lien permanent',
			'back' : 'Annuler'
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
		seekElementAt : function(element, seconds) {
			if (element.fastSeek !== undefined) {
				element.fastSeek(seconds);
				// Firefox doesn't see fastSeek
			} else {
				try {
					// but can set currentTime
					element.currentTime = seconds;
				} catch(e) {
					// exept sometimes, so you must use standard media fragment
					element.src = element.currentSrc.split('#')[0] + '#t=' + seconds;
				}
			}
		},
		jumpIdAt : function(hash,timecode,callback_fx) {
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
				self.seekElementAt(el, secs);

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
			self.jumpIdAt(atoms[0],atoms[1],callback_fx);
		},
		update_playbutton : function(event, element, container) {
			container.querySelector('.'+self.container.classname+'-pause').style.display = element.paused ? 'none' : 'block';
			container.querySelector('.'+self.container.classname+'-play').style.display = element.paused ? 'block' : 'none' ;

		},
		update_time : function(event, element, container) {
			container.querySelector('.'+self.container.classname+'-elapse').innerHTML = self.convertSecondsInTime(element.currentTime) + ' / ' + self.convertSecondsInTime(Math.round(element.duration));
			container.querySelector('.'+self.container.classname+'-elapsedline').style.width = element.duration === 0 ? 0 : (String(100 *element.currentTime / element.duration)+'%')
		},
		update : function(event) {
			var element = event.target;
			var container = document.getElementById(element.dataset.ondemiroir);
			self.update_playbutton(event, element, container)
			self.update_time(event, element, container)
		},
		find_container : function (child) {
			if (child.closest) {
				// DOMnode.closest is not yet available anywhere
				return child.closest('.'+self.container.classname)
			}
			return (child.className === self.container.classname) ? child : self.find_container(child.parentNode);
		},
		do_throbble : function(event) {
			var container = self.find_container(event.target);
			var audiotag = document.getElementById(container.dataset.rel);
			var ratio = (event.clientX - event.target.offsetLeft) / event.target.clientWidth;
			self.seekElementAt(audiotag, ratio * audiotag.duration)
		},
		do_pause : function(event) {
			var container = self.find_container(event.target);
			document.getElementById(container.dataset.rel).pause();
		},
		do_play : function(event) {
			var container = self.find_container(event.target);
			document.getElementById(container.dataset.rel).play();
		},
		update_links : function(player, zone) {
			function ahref(category, href) {
				zone.querySelector('.'+self.container.classname+'-'+category).href = href;
			}
			var url = player.dataset.canonical+'#'+player.id+(player.currentTime === 0 ? '' : self.separator+self.convertSecondsInTime(player.currentTime));
			var _url = encodeURI(url);
			var _title = encodeURI(player.title);
			ahref('twitter', 'https://twitter.com/share?text='+_title+'&url='+_url+'&via=dascritch');
			ahref('facebook', 'https://www.facebook.com/sharer.php?t='+_title+'&u='+_url);
			ahref('googleplus', 'https://plus.google.com/share?url='+_url);
			ahref('email', 'mailto:?subject='+_title+'&body='+_url);
			ahref('link', url);
		},
		show_actions : function(event) {
			var container = self.find_container(event.target);
			container.querySelector('.'+self.container.classname+'-pagemain').style.display = 'none';
			container.querySelector('.'+self.container.classname+'-pageshare').style.display = 'flex';
			self.update_links(document.getElementById(container.dataset.rel), container.querySelector('.'+self.container.classname+'-share'))
		},
		show_main : function(event) {
			var container = self.find_container(event.target);
			container.querySelector('.'+self.container.classname+'-pagemain').style.display = 'flex';
			container.querySelector('.'+self.container.classname+'-pageshare').style.display = 'none';
		},
		populate_template : function(inner, entry) {
			for (var key in entry) {
				inner = inner.replace(RegExp('{{'+key+'}}','g'), entry[key]);
			}
			return inner;
		},
		element_attribute : function(element, key, missing) {
			return (element.attributes[key] === undefined) ? missing : element.attributes[key].value;
		},
		get_params_for_template : function(element) {
			element.dataset.canonical === undefined ? document.location.href : element.dataset.canonical;
			var out = {
				// keys are stringed, as we need them not being modified
				'title'     : element.title === '' ? ('<em>'+self.__['(no title)']+'</em>') : element.title,
				'canonical' : element.dataset.canonical,
				'poster' 	: self.element_attribute(element,'poster', self.poster_fallback),
				'classname' : self.container.classname,
				'svg_pictos': self.svg_pictos
			}
			// we now add locales
			for (var key in self.__) {
				out[key] = self.__[key];
			}
			return out;
		},
		build : function(element) {
			if (element.id === '') {
				element.id = self.dynamicallyAllocatedIdPrefix + String(self.count_element);
			}
			var container = document.createElement(self.container.tagname)
			container.id = self.container.idPrefix + String(self.count_element);
			element.dataset.ondemiroir = container.id;
			container.dataset.rel = element.id;
			container.className = self.container.classname;
			container.innerHTML = self.populate_template(_template, self.get_params_for_template(element));
			element.parentNode.insertBefore(container, element);

			var cliquables = {
				'pause'		: self.do_pause,
				'play'		: self.do_play,
				'time'		: self.do_throbble,
				'actions'	: self.show_actions,
				'back' 		: self.show_main,
			};
			for (var that in cliquables) {
				container.querySelector('.'+self.container.classname+'-'+that).addEventListener('click', cliquables[that]);
			}

			[
				'ready', 'load',
				'error',
				'play', 'playing', 'pause', 'suspend', 'ended',
				'durationchange',  'loadedmetadata', 'progress', 'timeupdate'
			].forEach( function(on){ element.addEventListener(on, self.update); } );
			self.update({target : element})
			if (self.dontHideAudioTag === false) {
				element.style.display = 'none';
			}

			self.count_element++;
		},

		insertStyle : function() {
			var element = document.createElement('style');
			element.id = self.styleId;
			element.innerHTML = self.populate_template(_style, self.get_params_for_template(element));
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