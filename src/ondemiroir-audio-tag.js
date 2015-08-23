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

	var _traces = {
		'play' : '<path d="M 6,6 6,26 26,16 z" />',
		'stop' : '<path d="M 6,6 6,26 26,26 26,6 z" />',
		'pause' : '<path d="M 6,6 12.667,6 12.667,26 6,26 z" /><path d="M 19.333,6 26,6 26,26 19.333,26 z" />',
		'share' : '<circle cx="12" cy="10" r="4" /><circle cx="12" cy="22" r="4" /><circle cx="23" cy="16" r="4" /><polygon points="12,8 24,14 24,18 12,12"/><polygon points="12,20 24,14 24,18 12,24"/>',
		'facebook' : '<path d="m 21.117,16.002 -3.728,0 0,10.027 -4.297,0 0,-10.027 -2.070,0 0,-3.280 2.070,0 0,-2.130 c 0,-2.894 1.248,-4.616 4.652,-4.616 l 3.922,0 0,3.549 -3.203,0 c -0.950,-0.001 -1.068,0.495 -1.068,1.421 l -0.005,1.775 4.297,0 -0.568,3.280 0,2.34e-4 z" />',
		'twitter' : '<path d="M 25.941,9.885 C 25.221,10.205 24.448,10.422 23.637,10.520 24.465,10.020 25.101,9.230 25.401,8.288 24.626,8.750 23.768,9.086 22.854,9.267 22.122,8.483 21.080,7.993 19.926,7.993 c -2.215,0 -4.011,1.806 -4.011,4.034 0,0.316 0.035,0.623 0.103,0.919 -3.333,-0.168 -6.288,-1.774 -8.267,-4.215 -0.345,0.596 -0.542,1.289 -0.542,2.028 0,1.399 0.708,2.634 1.784,3.358 -0.657,-0.020 -1.276,-0.202 -1.816,-0.504 -3.98e-4,0.016 -3.98e-4,0.033 -3.98e-4,0.050 0,1.954 1.382,3.585 3.217,3.955 -0.336,0.092 -0.690,0.141 -1.056,0.141 -0.258,0 -0.509,-0.025 -0.754,-0.072 0.510,1.602 1.991,2.769 3.746,2.801 -1.372,1.082 -3.102,1.726 -4.981,1.726 -0.323,0 -0.642,-0.019 -0.956,-0.056 1.775,1.144 3.883,1.812 6.148,1.812 7.377,0 11.411,-6.147 11.411,-11.478 0,-0.174 -0.004,-0.348 -0.011,-0.522 0.783,-0.569 1.463,-1.279 2.001,-2.088 z" />',
		'googleplus' : '<path d="M80.704,48.884,79.76,48.157c-0.28748-0.23641-0.68066-0.54849-0.68066-1.1198,0-0.57364,0.39318-0.93836,0.73446-1.276,1.0997-0.85822,2.1984-1.7717,2.1984-3.6966,0-1.9794-1.2561-3.0207-1.8581-3.5147h1.6232l1.705-1.06h-5.1616c-1.4163,0-3.4574,0.33229-4.9516,1.5555-1.1262,0.9635-1.6756,2.292-1.6756,3.4879,0,2.0302,1.572,4.0881,4.348,4.0881,0.26212,0,0.54889-0.02562,0.83756-0.05217-0.12964,0.31278-0.2607,0.57316-0.2607,1.0152,0,0.80628,0.41783,1.3007,0.78613,1.7691-1.1795,0.08037-3.3815,0.20986-5.0047,1.1992-1.546,0.91156-2.0164,2.2384-2.0164,3.1748,0,1.9275,1.8322,3.7229,5.6316,3.7229,4.5054,0,6.8905-2.472,6.8905-4.919,0-1.798-1.0473-2.683-2.2003-3.646zm-3.4315-2.9934c-2.2539,0-3.2749-2.8891-3.2749-4.6323,0-0.67868,0.12964-1.3794,0.57544-1.9268,0.4202-0.52123,1.1521-0.8594,1.8353-0.8594,2.1728,0,3.2998,2.9149,3.2998,4.7898,0,0.46906-0.05214,1.3003-0.65459,1.9012-0.42139,0.41689-1.1265,0.72756-1.7811,0.72756zm0.02583,10.468c-2.8028,0-4.6101-1.3294-4.6101-3.1779,0-1.848,1.6758-2.4731,2.2524-2.6802,1.0997-0.36684,2.5148-0.41806,2.7509-0.41806,0.26188,0,0.39295,0,0.60151,0.02608,1.9925,1.406,2.8573,2.1068,2.8573,3.4378,0,1.6119-1.3364,2.8122-3.852,2.8122z" /><polygon  points="86.04,49.78 87.33,49.78 87.33,47.03 89.94,47.03 89.94,45.86 87.33,45.86 87.33,43.23 86.04,43.23 86.04,45.86 83.40,45.86 83.40,47.03 86.04,47.03"/>',
		'email' : '<path d="m 8.030,8.998 15.920,0 c 0.284,0 0.559,0.053 0.812,0.155 l -8.773,9.025 -8.773,-9.026 c 0.253,-0.101 0.528,-0.155 0.812,-0.155 z m -1.990,12.284 0,-10.529 c 0,-0.036 0.002,-0.073 0.004,-0.109 l 5.835,6.003 -5.771,5.089 c -0.045,-0.146 -0.068,-0.298 -0.069,-0.453 z m 17.910,1.754 -15.920,0 c -0.175,0 -0.348,-0.020 -0.514,-0.060 l 5.662,-4.993 2.811,2.892 2.811,-2.892 5.662,4.993 c -0.165,0.039 -0.338,0.060 -0.514,0.060 z m 1.990,-1.754 c 0,0.155 -0.023,0.307 -0.068,0.453 l -5.771,-5.089 5.835,-6.003 c 0.002,0.036 0.004,0.073 0.004,0.109 z" />',
	}

	var _style =
'.{{classname}} {'
+'	background : #555;'
+'	color : #ccc;'
+'	{{displayflex}};'
+'	font-family : Lato, "Open Sans", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;'
+'	border : none;'
+'	padding : 0;'
+'	margin : 0;'
+'}'
+'.{{classname}} a {'
+'	color : #aaf;'
+'}'
+'.{{classname}} svg {'
+'  fill : #ffffff'
+'}'
+'.{{classname}}-cover , .{{classname}}-play , .{{classname}}-pause, .{{classname}}-actions  {'
+'	-webkit-box-flex : 0 0 64px; -webkit-flex : 0 0 64px; -ms-flex : 0 0 64px; flex : 0 0 64px;'
+'	height : 64px;'
+'	text-align : center;'
+'	vertical-align : middle;'
+'}'
+'.{{classname}}-cover img {'
+'	width : 100%;'
+'	max-width : 64px;'
+'	max-height : 64px;'
+'}'
+'.{{classname}}-play , .{{classname}}-pause , .{{classname}}-actions, .{{classname}}-back {'
+'	cursor : pointer;'
+'}'
+'.{{classname}}-play svg, .{{classname}}-pause svg, .{{classname}}-actions svg {'
+'	vertical-align : middle;'
+'	width : 100%;'
+'	max-height : 100%;'
+'}'
+'.{{classname}}-titleline {'
+'	{{displayflex}};'
+'	position : relative;'
+'}'
+'.{{classname}}-about, .{{classname}}-title {'
+'	-webkit-box-flex : 1 1 100%; -webkit-flex : 1 1 100%; -ms-flex : 1 1 100%; flex : 1 1 100%;'
+'}'
+'.{{classname}}-elapse {'
+'	-webkit-box-flex : 1 0 120px; -webkit-flex : 1 0 120px; -ms-flex : 1 0 120px; flex : 1 0 120px;'
+'	text-align : right;'
+'}'
+'.{{classname}}-time {'
+'	background : black;'
+'	width : 100%;'
+'	height : 10px;'
+'	display : block;'
+'	border-radius : 4px;'
+'	position : relative;'
+'}'
+'.{{classname}}-elapsedline {'
+'	background : white;'
+'	height : 10px ;'
+'	display : block ;'
+'	position : absolute;'
+'	left : 0;'
+'	border-radius : 4px;'
+'	pointer-events : none;'
+'}'
+'.{{classname}}-pagemain, .{{classname}}-pageshare, .{{classname}}-share {'
+'	-webkit-flex : 1 1 100%; -ms-flex : 1 1 100%; flex : 1 1 100%;'
+'	{{displayflex}};'
//+'  -webkit-flex-direction: row; flex-direction: row;'
+'}'
+'.{{classname}}-pageshare {'
+'	display : none;'
+'}'
+'.{{classname}}-share a {'
+'	-webkit-flex : 1 0; -ms-flex : 1 0; flex : 1 0;'
+'	color : white;'
+'	text-decoration : none;'
+'}'
+'.{{classname}}-share svg {'
+'	vertical-align : middle;'
+'  width:32px; height : 32px;'
+'}'
+'.{{classname}}-twitter {background : #4DB5F4}'
+'.{{classname}}-facebook {background : #5974CC}'
+'.{{classname}}-googleplus {background : #E15646}'
+'.{{classname}}-email {background : #1DCE9A}'
+'.{{classname}}-link {background : #77F}'
+''
+'@media screen and (max-width: 640px) {'
+'	.{{classname}}-cover , .{{classname}}-play , .{{classname}}-pause, .{{classname}}-actions  {'
+'	 -webkit-box-flex : 0 0 32px; -webkit-flex : 0 0 32px; -ms-flex : 0 0 32px; flex : 0 0 32px;'
+'	height : 32px;'
+'	}'
+'	.{{classname}}-share {'
+'		text-align : center;'
+'	}'
+'	.{{classname}}-share span {'
+'		display : none;'
+'	}'
+'}'
+'@media screen and (max-width: 319px) {'
+'	.{{classname}}-elapse {'
+'		display : none;'
+'	}'
+'}';

	var _template =
 '<div class="{{classname}}-cover">'
+'	<img src="{{poster}}" alt="{{cover}}" />'
+'</div>'
+'<div class="{{classname}}-pagemain">'
+'	<div class="{{classname}}-play">{{svg:play}}</div><div class="{{classname}}-pause">{{svg:pause}}</div>'
+'	<div class="{{classname}}-about">'
+'		<div class="{{classname}}-titleline">'
+'			<div class="{{classname}}-title"><a href="{{canonical}}#">{{title}}</a></div>'
+'			<div class="{{classname}}-elapse">elapsed</div>'
+'		</div>'
+'		<div class="{{classname}}-line">'
+'			<div class="{{classname}}-time">'
+'				<div class="{{classname}}-elapsedline"></div>'
+'			</div>'
+'		</div>'
+'	</div>'
+'	<div class="{{classname}}-actions">{{svg:share}}</div>'
+'</div>'
+'<div class="{{classname}}-pageshare">'
+'	<div class="{{classname}}-share">'
+'		<a href="#" target="social" class="{{classname}}-twitter">{{svg:twitter}}<span>{{twitter}}</span></a>'
+'		<a href="#" target="social" class="{{classname}}-facebook">{{svg:facebook}}<span>{{facebook}}</span></a>'
+'		<a href="#" target="social" class="{{classname}}-googleplus">{{svg:share}}<span>{{googleplus}}</span></a>'
+'		<a href="#" target="social" class="{{classname}}-email">{{svg:email}}<span>{{e-mail}}</span></a>'
+'		<a href="{{playlister}}" target="playlist" class="{{classname}}-playlist">{{svg:play}}<span>{{playlist}}</span></a>'
+'		<a href="#" target="social" class="{{classname}}-link">{{svg:share}}<span>{{direct-link}}</span></a>'
+'		<div class="{{classname}}-back">{{back}}</div>'
+'	</div>'
+'</div>';

	var self = {
		dontHideAudioTag : false,
		separator : '&t=',
		selector : 'audio[controls]',
		dynamicallyAllocatedIdPrefix : 'OndeMiroirAudio-tag-',
		menuId : 'OndeMiroirAudio-menu',
		styleId : 'OndeMiroirAudio-style',
		container :  {
			tagname :'div',
			idPrefix : 'OndeMiroirAudio-Player-',
			classname : 'OndeMiroirAudio-Player'
		},
		poster_fallback : 'http://dascritch.net/themes/DSN13/img/entete1.svg',
		playlister : false,
		playlist_window : false,
		flexIs : 'flex', // FUCK SAFARI
		keymove : 5,
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
				seconds = (givenTime.indexOf(':') === -1) ? this.convertSubunitTimeInSeconds(givenTime) : this.convertColonTimeInSeconds(givenTime) ;
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
		do_onkey : function(event) {
			var container = self.find_container(event.target);
			var audiotag = document.getElementById(container.dataset.rel);
			switch(event.keyCode) {
				// can't use enter : standard usage
				case 27 : // esc
					self.seekElementAt(audiotag, 0);
					audiotag.pause();
					break;
				case 32 : // space
					audiotag.paused ? audiotag.play() : audiotag.pause();
					break;
				case 35 : // end
					self.seekElementAt(audiotag, audiotag.duration);
					break;
				case 36 : // home
					self.seekElementAt(audiotag, 0);
					break;
				case 37 : // ←
					self.seekElementAt(audiotag, audiotag.currentTime - self.keymove);
					break;
				case 39 : // →
					self.seekElementAt(audiotag, audiotag.currentTime + self.keymove);
					break;
			}
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
			ahref('playlist', self.playlister);
		},
		show_actions : function(event) {
			var container = self.find_container(event.target);
			container.querySelector('.'+self.container.classname+'-pagemain').style.display = 'none';
			container.querySelector('.'+self.container.classname+'-pageshare').style.display = self.flexIs;
			self.update_links(document.getElementById(container.dataset.rel), container.querySelector('.'+self.container.classname+'-share'))
		},
		show_main : function(event) {
			var container = self.find_container(event.target);
			container.querySelector('.'+self.container.classname+'-pagemain').style.display = self.flexIs;
			container.querySelector('.'+self.container.classname+'-pageshare').style.display = 'none';
		},
		push_in_playlist : function(params) {
			// loosy, but sunday morning, we'll clean it later
			if (! self.playlist_window.push_in_playlist) {
				window.setTimeout(self.push_in_playlist, 500, params);
				return;
			}
			self.playlist_window.push_in_playlist(params);
		},
		add_playlist : function(event) {
			self.playlist_window = window.open(self.playlister+'#', 'onde_miroir_player');
			// self.playlist_window = self.playlist_window ? self.playlist_window : window.open(self.playlister+'#', 'onde_miroir_player');
			var container = self.find_container(event.target);
			var audiotag = document.getElementById(container.dataset.rel);
			self.push_in_playlist({
				src 		: audiotag.currentSrc,
				title 		: audiotag.title,
				cover 		: audiotag.poster,
				canonical	: audiotag.dataset.canonical,
			})
			event.preventDefault();
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
				'displayflex'	: '	display: -ms-flexbox; display: -webkit-box; display: -webkit-flex; display: flex;',
				'playlister': self.playlister
			}
			// we now add locales
			for (var key in self.__) {
				out[key] = self.__[key];
			}
			// and svg traves
			for (var key in _traces) {
				out['svg:'+key] = '<svg viewBox="0 0 32 32">'+_traces[key]+'</svg>';
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
			container.tabIndex = 0 // see http://snook.ca/archives/accessibility_and_usability/elements_focusable_with_tabindex and http://www.456bereastreet.com/archive/201302/making_elements_keyboard_focusable_and_clickable/
			element.parentNode.insertBefore(container, element);

			var cliquables = {
				'pause'		: self.do_pause,
				'play'		: self.do_play,
				'time'		: self.do_throbble,
				'actions'	: self.show_actions,
				'back' 		: self.show_main,
				'cover'		: self.show_main,
				'playlist'	: self.add_playlist
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

			container.addEventListener('keydown', self.do_onkey);
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
			if (!self.playlister) {
				[].forEach.call(
					document.querySelectorAll('script[src]'), function(element){
						var pos = element.src.indexOf('ondemiroir-audio-tag.js')
						if (pos>-1) self.playlister = element.src.substr(0, pos) + 'index.html';
					}
				);
			}
			[].forEach.call(
				// explication de cette construction : https://coderwall.com/p/jcmzxw
				document.querySelectorAll(self.selector), self.build
			);
			// Safari is a piece of SHIT
			self.flexIs =  /chrome|safari/.test(navigator.userAgent.toLowerCase()) ? '-webkit-flex' : 'flex';
			self.flexIs =  /msie|microsoft/.test(navigator.userAgent.toLowerCase()) ? '-ms-flexbox' : self.flexIs;
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