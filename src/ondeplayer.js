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

    // WATCH OUT ! You should NOT use this script in a unsecure domain name
    if (document.domain !== '') {
		document.domain = document.domain.replace(/^(.*\.)?(\w+\.\w+)$/,'$2');
    }


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

	var _style =
'.{{classname}}, .{{classname}} *, .{{classname}}-cover img {'
+'	font-family : Lato, "Open Sans", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;'
+'	border : none;'
+'	padding : 0;'
+'	margin : 0;'
+'}'
+'.{{classname}} {'
+'	{{displayflex}};'
+'	background : #555;'
+'	color : #ccc;'
+'}'
+'.{{classname}} a {'
+'	color : #aaf;'
+'	border : none !important;'
+'}'
+'.{{classname}} svg {'
+'  fill : #ffffff'
+'}'
+'.{{classname}} a:hover {'
+'	color : #555;'
+'	background : #aaf;'
+'}'
+'.{{classname}} a:hover svg {'
+'	fill : #555;'
+'}'
+'.{{classname}}-cover , .{{classname}}-play , .{{classname}}-pause, .{{classname}}-actions  {'
+'	flex : 0 0 64px;'
+'	width : 64px;'
+'	height : 64px;'
+'	text-align : center;'
+'	vertical-align : middle;'
+'}'
+'.{{classname}}-cover img {'
+'	width : 64px;'
+'  max-width: 100%;'
+'	height : 64px;'
+'	object-fit: contain;'
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
+'	flex : 1 1 100%;'
+'}'
+'.{{classname}}-title a {'
+'  display : block;'
+'}'
+'.{{classname}}-elapse {'
+'	flex : 1 0 120px;'
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
+'	flex : 1 1 100%;'
+'	{{displayflex}};'
+'}'
+'	.{{classname}}-share {'
+'		text-align : center;'
+'	}'
+'.{{classname}}-share a, .{{classname}}-share div {'
+'	flex : 1 0;'
+'	color : white;'
+'	text-decoration : none;'
+'}'
+'.{{classname}}-share svg {'
+'	vertical-align : middle;'
+'  width:32px; height : 32px;'
+'}'
+'.{{classname}}-twitter {background : #4DB5F4}'
+'.{{classname}}-facebook {background : #5974CC}'
+'.{{classname}}-email {background : #CC0000}'
+'.{{classname}}-link {background : #77F}'
+''
+'@media screen and (max-width: 640px) {'
+'	.{{classname}}-cover , .{{classname}}-play , .{{classname}}-pause, .{{classname}}-actions  {'
+'	flex : 0 0 32px;'
+'	height : 32px;'
+'	}'
+'  .{{classname}}-nosmall {'
+'	  display : none;'
+'  }'
+'}'
+'@media screen and (max-width: 319px) {'
+'	.{{classname}}-elapse {'
+'		display : none;'
+'	}'
+'}';

	var _template =
 '<div class="{{classname}}-cover {{classname}}-nosmall">'
+'	<img src="{{poster}}" alt="{{cover}}" />'
+'</div>'
+'<div class="{{classname}}-pagemain">'
+'	<a class="{{classname}}-play">{{svg:play}}</a><a class="{{classname}}-pause">{{svg:pause}}</a>'
+'	<div class="{{classname}}-about">'
+'		<div class="{{classname}}-titleline">'
+'			<div class="{{classname}}-title"><a href="{{canonical}}" class="{{classname}}-canonical">{{title}}</a></div>'
+'			<a class="{{classname}}-elapse">elapsed</a>'
+'		</div>'
+'		<div class="{{classname}}-line">'
+'			<div class="{{classname}}-time">'
+'				<div class="{{classname}}-elapsedline"></div>'
+'			</div>'
+'		</div>'
+'	</div>'
+'	<a class="{{classname}}-actions">{{svg:share}}</a>'
+'</div>'
+'<div class="{{classname}}-pageshare">'
+'	<div class="{{classname}}-share">'
+'		<a href="#" target="social" class="{{classname}}-twitter {{classname}}-nosmall">{{svg:twitter}}<span>{{twitter}}</span></a>'
+'		<a href="#" target="social" class="{{classname}}-facebook {{classname}}-nosmall">{{svg:facebook}}<span>{{facebook}}</span></a>'
+'		<a href="#" target="social" class="{{classname}}-email">{{svg:email}}<span>{{e-mail}}</span></a>'
+'		<a href="{{playlister}}" target="onde_miroir_player" class="{{classname}}-playlist">{{svg:play}}<span>{{playlist}}</span></a>'
+'		<a href="#" target="social" class="{{classname}}-link">{{svg:download}}<span>{{download}}</span></a>'
+'		<a class="{{classname}}-back">{{back}}</a>'
+'	</div>'
+'</div>';

	var self = {
		dontHideAudioTag : false,
		selector : 'audio[controls]',
		selector_fallback : 'audio[data-ondeplayer]',
		dynamicallyAllocatedIdPrefix : 'OndeMiroirAudio-tag-',
		menuId : 'OndeMiroirAudio-menu',
		styleId : 'OndeMiroirAudio-style',
		container :  {
			tagname :'div',
			idPrefix : 'OndeMiroirAudio-Player-',
			classname : 'OndeMiroirAudio-Player'
		},
		poster_fallback : '//dascritch.net/themes/DSN13/img/entete1.svg',
		playlister : false,
		playlist_window : false,
		is_in_playlist : false,
		rebuild_eventname : 'ondemiroir.rebuild',
		keymove : 5,
		__ : {
			'(no title)' : '(sans titre)',
			'cover' : 'pochette',
			'more' : 'Partager',
			'twitter' : 'Partager sur Twitter',
			'facebook' : 'Partager sur Facebook',
			'e-mail' : 'Partager par e-mail',
			'playlist' : 'Écouter plus tard',
			'download' : 'Télécharger',
			'back' : 'Annuler'
		},
		_traces : {
			'play' : '<path d="M 6,6 6,26 26,16 z" />',
			'stop' : '<path d="M 6,6 6,26 26,26 26,6 z" />',
			'pause' : '<path d="M 6,6 12.667,6 12.667,26 6,26 z" /><path d="M 19.333,6 26,6 26,26 19.333,26 z" />',
			'share' : '<circle cx="12" cy="10" r="4" /><circle cx="12" cy="22" r="4" /><circle cx="23" cy="16" r="4" /><polygon points="12,8 24,14 24,18 12,12"/><polygon points="12,20 24,14 24,18 12,24"/>',
			'facebook' : '<path d="m 21.117,16.002 -3.728,0 0,10.027 -4.297,0 0,-10.027 -2.070,0 0,-3.280 2.070,0 0,-2.130 c 0,-2.894 1.248,-4.616 4.652,-4.616 l 3.922,0 0,3.549 -3.203,0 c -0.950,-0.001 -1.068,0.495 -1.068,1.421 l -0.005,1.775 4.297,0 -0.568,3.280 0,2.34e-4 z" />',
			'twitter' : '<path d="M 25.941,9.885 C 25.221,10.205 24.448,10.422 23.637,10.520 24.465,10.020 25.101,9.230 25.401,8.288 24.626,8.750 23.768,9.086 22.854,9.267 22.122,8.483 21.080,7.993 19.926,7.993 c -2.215,0 -4.011,1.806 -4.011,4.034 0,0.316 0.035,0.623 0.103,0.919 -3.333,-0.168 -6.288,-1.774 -8.267,-4.215 -0.345,0.596 -0.542,1.289 -0.542,2.028 0,1.399 0.708,2.634 1.784,3.358 -0.657,-0.020 -1.276,-0.202 -1.816,-0.504 -3.98e-4,0.016 -3.98e-4,0.033 -3.98e-4,0.050 0,1.954 1.382,3.585 3.217,3.955 -0.336,0.092 -0.690,0.141 -1.056,0.141 -0.258,0 -0.509,-0.025 -0.754,-0.072 0.510,1.602 1.991,2.769 3.746,2.801 -1.372,1.082 -3.102,1.726 -4.981,1.726 -0.323,0 -0.642,-0.019 -0.956,-0.056 1.775,1.144 3.883,1.812 6.148,1.812 7.377,0 11.411,-6.147 11.411,-11.478 0,-0.174 -0.004,-0.348 -0.011,-0.522 0.783,-0.569 1.463,-1.279 2.001,-2.088 z" />',
			'email' : '<path d="m 8.030,8.998 15.920,0 c 0.284,0 0.559,0.053 0.812,0.155 l -8.773,9.025 -8.773,-9.026 c 0.253,-0.101 0.528,-0.155 0.812,-0.155 z m -1.990,12.284 0,-10.529 c 0,-0.036 0.002,-0.073 0.004,-0.109 l 5.835,6.003 -5.771,5.089 c -0.045,-0.146 -0.068,-0.298 -0.069,-0.453 z m 17.910,1.754 -15.920,0 c -0.175,0 -0.348,-0.020 -0.514,-0.060 l 5.662,-4.993 2.811,2.892 2.811,-2.892 5.662,4.993 c -0.165,0.039 -0.338,0.060 -0.514,0.060 z m 1.990,-1.754 c 0,0.155 -0.023,0.307 -0.068,0.453 l -5.771,-5.089 5.835,-6.003 c 0.002,0.036 0.004,0.073 0.004,0.109 z" />',
			'download' : '<path d="M 6,6 26,6 16,26 z" /><rect x="6" y="22" width="20" height="4" />',
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
			var inned = false;
			for(var key in _units) {
				if (_units.hasOwnProperty(key)) {
					var multiply = _units[key];
					if ((givenSeconds >= multiply) || (inned)) {
						inned = true;
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
			var audiotag;
			function _isEvent(event) {
				return event.preventDefault !== undefined;
			}

			function do_element_play(event) {
				var tag = event.target;
				tag.play();
				if (_isEvent(event)) {
					tag.removeEventListener('canplay', do_element_play, true);
				}
				onDebug(callback_fx);
			}

			function do_needle_move(event) {
				if (_isEvent(event)) {
					audiotag.removeEventListener('loadedmetadata', do_needle_move, true);
				}

				var secs = self.convertTimeInSeconds(timecode);
				self.seekElementAt(audiotag, secs);

				if (audiotag.readyState >= audiotag.HAVE_FUTURE_DATA)  {
					do_element_play({ target : audiotag });
				} else {
					audiotag.addEventListener('canplay', do_element_play, true);
				}
			}

			audiotag = (hash !== '') ? document.getElementById(hash) : document.querySelector(this.selector_fallback);

			if ((audiotag === undefined) || (audiotag === null) || (audiotag.currentTime === undefined)) {
				return false;
			}

			if (audiotag.readyState < audiotag.HAVE_CURRENT_DATA ) {
				audiotag.addEventListener('loadedmetadata', do_needle_move , true);
				audiotag.load();
			} else {
				do_needle_move({});
			}
		},
		hashOrder : function(hashcode,callback_fx){
			var at_start = false;
			if (typeof hashcode !== 'string') {
				at_start = 'at_start' in hashcode;
				hashcode = document.location.hash.substr(1);
			}
			var hash = '';
			var timecode = '';
			var segments = hashcode.split('&');
			var autoplay = false;

			for (var _id in segments) {
				var parameter = segments[_id];
				if (parameter.indexOf('=') === -1) {
					// should reference to the ID of the element
					hash = parameter;
				} else {
					// should be a key=value parameter
					var atoms = parameter.split('=');
					var p_key = atoms[0];
					var p_value = atoms[1];
					switch (p_key) {
						case 't':
							// is a time index
							timecode = p_value;
							break;
						case 'autoplay':
							if (p_value='1') {
								autoplay = true;
							}
							break;
						case 'auto_play':
							if (p_value='true') {
								autoplay = true;
							}
							break;
					}

				}
			}

			if ((timecode === '') || ((at_start) && (!autoplay))) {
				onDebug(callback_fx);
				return ;
			}
			self.jumpIdAt(hash,timecode,callback_fx);
		},
		update_playbutton : function(event, element, container) {
			container.querySelector('.'+self.container.classname+'-pause').hidden = element.paused ;
			container.querySelector('.'+self.container.classname+'-play').hidden = !element.paused ;
		},
		update_time : function(event, element, container) {
			var link_to = self.absolutize_url(element.dataset.canonical)+'#';
			link_to += element.id ? (element.id+'&') : '';
			var timecode = self.convertSecondsInTime(element.currentTime)
			link_to += 't='+timecode;

			var elapse_element = container.querySelector('.'+self.container.classname+'-elapse');
			elapse_element.href = link_to;
			elapse_element.innerHTML = timecode + ' / ' + self.convertSecondsInTime(Math.round(element.duration));
			container.querySelector('.'+self.container.classname+'-elapsedline').style.width = element.duration === 0 ? 0 : (String(100 *element.currentTime / element.duration)+'%');
		},
		update : function(event) {
			var element = event.target;
			var container = document.getElementById(element.dataset.ondemiroir);
			self.update_playbutton(event, element, container)
			self.update_time(event, element, container)
			if (element.paused) {
				localStorage.removeItem(element.src);
			} else {
				localStorage.setItem(element.src, String(element.currentTime));
			}
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
			var relLeft = event.target.getClientRects()[0].left;
			var ratio = (event.clientX - relLeft) / event.target.clientWidth;
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
		absolutize_url : function(url) {
			var test_element = document.createElement('a');
			test_element.href = url;
			return test_element.href;
		},
		update_links : function(player, zone) {
			function ahref(category, href) {
				zone.querySelector('.'+self.container.classname+'-'+category).href = href;
			}
			var canonical = player.dataset.canonical
			var url = (canonical === undefined ? '' : canonical )
						+'#'+ player.id 
						+ (player.currentTime === 0 ? '' : (self.separator+self.convertSecondsInTime(player.currentTime)));
			var _url = encodeURI(self.absolutize_url(url));
			var _title = encodeURI(player.title);
			ahref('twitter', 'https://twitter.com/share?text='+_title+'&url='+_url+'&via=dascritch');
			ahref('facebook', 'https://www.facebook.com/sharer.php?t='+_title+'&u='+_url);
			ahref('email', 'mailto:?subject='+_title+'&body='+_url);
			ahref('link', player.currentSrc);
			ahref('playlist', self.playlister);
		},
		show_actions : function(event) {
			var container = self.find_container(event.target);
			container.querySelector('.'+self.container.classname+'-pagemain').style.display  = 'none';
			container.querySelector('.'+self.container.classname+'-pageshare').style.display  = 'flex';
			self.update_links(document.getElementById(container.dataset.rel), container.querySelector('.'+self.container.classname+'-share'))
		},
		show_main : function(event) {
			var container = self.find_container(event.target);
			container.querySelector('.'+self.container.classname+'-pagemain').style.display = 'flex';
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
			var container = self.find_container(event.target);
			var audiotag = document.getElementById(container.dataset.rel);
			self.push_in_playlist({
				src 		: self.absolutize_url(audiotag.currentSrc),
				title 		: audiotag.title,
				cover 		: self.absolutize_url(self.element_attribute(audiotag, 'poster', self.poster_fallback)),
				canonical	: self.absolutize_url(audiotag.dataset.canonical),
			});
			// make pause current, as launched in playlist
			audiotag.pause();
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
				'title'     	: element.title === '' ? ('<em>'+self.__['(no title)']+'</em>') : element.title,
				'canonical' 	: self.absolutize_url(element.dataset.canonical),
				'poster' 		: self.absolutize_url(self.element_attribute(element,'poster', self.poster_fallback)),
				'classname' 	: self.container.classname,
				'displayflex'	: 'display: flex;',
				'playlister'	: self.playlister
			}
			// we now add locales
			for (var key in self.__) {
				out[key] = self.__[key];
			}
			// and svg traves
			for (var key in self._traces) {
				out['svg:'+key] = '<svg viewBox="0 0 32 32">'+self._traces[key]+'</svg>';
			}
			return out;
		},
		rebuild : function(event) {
			var audiotag = event.target;
			document.getElementById(audiotag.dataset.ondemiroir).remove();
			self.build(audiotag);
		},
		build : function(audiotag) {
			if (audiotag.id === '') {
				audiotag.id = self.dynamicallyAllocatedIdPrefix + String(self.count_element);
			}

			if (audiotag.preload === '') {
				// ask ASAP metadata about media
				audiotag.preload = 'metadata';
			}

			/** TODO bug duplicate controler 
				* parameterize place to insert cointainer, perhaps audiotag.dataset.ondemiroir
					* MUST have TAGNAME === self.container.tagname 
					* may be called via self.build_clone() with dataset.player-clone === audiotag
					* SHOULD have an ID, or be recalculated via self.build_clone()
				* get its id value, to NOT precalculate container.id but reuse it
				* use a dynamic dataset in audiotag to add players to impact
				* on rebuild event, rebuild clones
			**/


			var container = document.createElement(self.container.tagname)
			container.id = self.container.idPrefix + String(self.count_element);
			audiotag.dataset.ondemiroir = container.id;
			container.dataset.rel = audiotag.id;
			container.className = self.container.classname;
			container.innerHTML = self.populate_template(_template, self.get_params_for_template(audiotag));
			container.tabIndex = 0 // see http://snook.ca/archives/accessibility_and_usability/elements_focusable_with_tabindex and http://www.456bereastreet.com/archive/201302/making_elements_keyboard_focusable_and_clickable/
			audiotag.parentNode.insertBefore(container, audiotag);

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

			var lasttimecode = Number(localStorage.getItem(audiotag.src));
			// TODO and no hased time
			if (lasttimecode > 0) {
				self.seekElementAt(audiotag, lasttimecode);
				audiotag.play();
			}

			[
				'ready', 'load',
				'error',
				'play', 'playing', 'pause', 'suspend', 'ended',
				'durationchange',  'loadedmetadata', 'progress', 'timeupdate'
			].forEach( function(on){ audiotag.addEventListener(on, self.update); } );
			audiotag.addEventListener('ondemiroir.rebuild', self.rebuild);

			self.update({target : audiotag})
			if (self.dontHideAudioTag === false) {
				audiotag.hidden = true;
				// PHRACK SAFARI
				audiotag.removeAttribute('controls');
				audiotag.setAttribute('data-ondeplayer','');
				self.show_main({target : container.querySelector('a')});
			}

			container.addEventListener('keydown', self.do_onkey);
			self.count_element++;
		},
		prevent_link_on_same_page : function(event) {
			if (self.absolutize_url( document.location.href ) !== self.absolutize_url(event.target.href)) {
				return ;
			}
			event.preventDefault();

		},
		element_prevent_link_on_same_page : function(element) {
			element.addEventListener('click', self.prevent_link_on_same_page);
		},
		insertStyle : function() {
			var element = document.createElement('style');
			element.id = self.styleId;
			if (self.is_in_playlist) {
				_style += ' .{{classname}}-playlist { display : none; }';
			}
			element.innerHTML = self.populate_template(_style, self.get_params_for_template(element));
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(element);
		},
		querySelector_apply : function(selector, callback) {
			[].forEach.call(
				// explication de cette construction : https://coderwall.com/p/jcmzxw
				document.querySelectorAll(selector), callback
			);
		},
		launch : function() {
			if (document.getElementById(self.styleId) !== null) {
				// injected <style> is already there
				return ;
			}
			if (!self.playlister) {
				function find_playlister_from_js_scr(element) {
					var pos = element.src.indexOf('ondeplayer.js')
					if (pos>-1) {
						self.playlister = self.absolutize_url(element.src.substr(0, pos) + 'index.html');
						if (self.playlister === document.location.href.replace(/#.*$/,'')) {
							self.is_in_playlist = true;
						}
					}
				}
				self.querySelector_apply('script[src]', find_playlister_from_js_scr);

			}
			new CustomEvent(self.rebuild);
			self.querySelector_apply(self.selector, self.build);
			self.insertStyle();
			self.querySelector_apply('.'+self.container.classname+'-canonical', self.element_prevent_link_on_same_page);
			self.hashOrder({ at_start : true });
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
