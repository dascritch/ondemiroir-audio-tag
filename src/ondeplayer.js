/** @license
	OndeMirroir Audio Tag, an extension to the hash system to address timecode into audio/video elements
	Copyright (C) 2014-2017 Xavier "dascritch" Mouton-Dubosc
	Previously TimecodeHash

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
	project repository : https://github.com/dascritch/ondemiroir-audio-tag
	blog post : http://dascritch.net/post/2014/09/03/Timecodehash-%3A-Lier-vers-un-moment-d-un-sonore

 */

'use strict';

import cpu_style from './ondeplayer.css.js';
import cpu_template from './ondeplayer.html.js';
import cpu_i18n from './ondeplayer.i18n.js';
import __ from './__/__.js';
import cpu_svg from './ondeplayer.svg.js';


window.OndeMiroirAudio = function() {

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

	function querySelector_apply(selector, callback, subtree) {
		subtree = subtree === undefined ? document : subtree;
		// explication de cette construction : https://coderwall.com/p/jcmzxw
		[].forEach.call(subtree.querySelectorAll(selector), callback);
	}

	function prepare_i18n() {
		for (var key in cpu_svg) {
				cpu_i18n['-']['svg:'+key] = '<svg viewBox="0 0 32 32">'+cpu_svg[key]+'</svg>';
			}

		if (!__.merge_source(cpu_i18n)) {
		    __._add_locale('en', cpu_i18n);
		}
	}

	var self = {
		dontHideAudioTag : false,
		selector_media : 'audio[controls]',
		selector_fallback : 'audio[data-ondeplayer]',
		selector_container : 'div[data-ondeplayer]',
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
		seekElementAt : function(audiotag, seconds) {
			if (audiotag.fastSeek !== undefined) {
				audiotag.fastSeek(seconds);
				// Firefox doesn't see fastSeek
			} else {
				try {
					// but can set currentTime
					audiotag.currentTime = seconds;
				} catch(e) {
					// exept sometimes, so you must use standard media fragment
					audiotag.src = audiotag.currentSrc.split('#')[0] + '#t=' + seconds;
				}
			}
			function update_id_container_loading(container_id) {
				var container = document.getElementById(container_id);
				self.update_line(audiotag, container, 'loading', seconds);
				self.update_act_container('loading', container);
			}
			audiotag._ondemiroir.forEach(update_id_container_loading);
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
				self.update({target : audiotag});
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
			self.update({target : audiotag});
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
			document.location.hash = '#'+hash;
		},
		update_act_container : function (act, container) {
			container.classList.remove(
				self.container.classname+'-act-loading',
				self.container.classname+'-act-pause',
				self.container.classname+'-act-play');
			container.classList.add(self.container.classname+'-act-'+act);
		},
		update_playbutton : function(event, audiotag, container) {

			if (audiotag.readyState < audiotag.HAVE_CURRENT_DATA ) {
				self.update_act_container('loading', container);
				return;
			}
			if (!audiotag.paused) {
				self.update_act_container('play', container);
			} else {
				self.update_act_container('pause', container);
			}
		},
		update_line : function(audiotag, container, type, seconds) {
			// type = 'elapsed', 'loading'
			container._elements[type+'line'].style.width = audiotag.duration === 0 ? 0 : (String(100 *seconds / audiotag.duration)+'%');
		},
		update_time : function(event, audiotag, container) {
			var link_to = self.absolutize_url(audiotag.dataset.canonical)+'#';
			link_to += audiotag.id ? (audiotag.id+'&') : '';
			var timecode = self.convertSecondsInTime(audiotag.currentTime)
			link_to += 't='+timecode;

			var elapse_element = container._elements['elapse'];
			elapse_element.href = link_to;

			var total_duration = '…';
			if (!isNaN(Math.round(audiotag.duration))){
				total_duration = self.convertSecondsInTime(Math.round(audiotag.duration));
			} 
			 
			elapse_element.innerHTML = timecode + '<span class="'+self.container.classname+'-nosmall"> / ' + total_duration+'</span>';
			self.update_line(audiotag, container, 'elapsed', audiotag.currentTime);
		},
		update_id_container_infos: function (container_id) {
				var container = document.getElementById(container_id);
				var event = this;
				var audiotag = event.target;
				if (audiotag.error === 'error') {
					self.update_act_container('error', container);

				   switch (audiotag.error.code) {
						case audiotag.error.MEDIA_ERR_ABORTED:
							alert(__.s('media_err_aborted'));
							break;
						case audiotag.error.MEDIA_ERR_NETWORK:
							alert(__.s('media_err_network'));
							break;
						case audiotag.error.MEDIA_ERR_DECODE:
							alert(__.s('media_err_decode'));
							break;
						case audiotag.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
							alert(__.s('media_err_src_not_supported'));
							break;
						default:
							alert(__.s('media_err_unknow'));
							break;
				   	}
					return;
				}
				self.update_playbutton(event, audiotag, container);
				self.update_time(event, audiotag, container);
		},
		update : function(event) {
			var audiotag = event.target;
			audiotag._ondemiroir.forEach(self.update_id_container_infos, event);
			if (!audiotag.paused) {
				localStorage.setItem(audiotag.currentSrc, String(audiotag.currentTime));
			}
		},
		find_container : function (child) {
			if (child.closest) {
				// DOMnode.closest is not yet available anywhere
				return child.closest('.'+self.container.classname)
			}
			return (child.className === self.container.classname) ? child : self.find_container(child.parentNode);
		},
		show_thobber_at : function(container, seeked_time) {
			var audiotag = document.getElementById(container.dataset.ondeplayer);
			if (audiotag.duration < 1) {
				// do not try to show if no metadata
				return;
			}
			var phylactere = container._elements['popup'];
			var elapse_element = container._elements['line'];

			/* 30 pixels out, the Part Of Gad in the CSS */
			phylactere.style.opacity = 1;
			phylactere.style.left = (100 * seeked_time / audiotag.duration ) +'%';
			phylactere.innerHTML = self.convertSecondsInTime(seeked_time);
		},
		hide_throbber : function(container) {
			var phylactere = container._elements['popup'];
			phylactere.style.opacity = 0;
		},
		hide_throbber_later : function(container) {
			var phylactere = container._elements['popup'];
			if (phylactere._hider) {
				window.clearTimeout(phylactere._hider);
			}
			phylactere._hider = window.setTimeout(self.hide_throbber, 1000, container);

		},

		do_hover : function(event) {
			var target_rect = event.target.getClientRects()[0];
			var relLeft = target_rect.left;
			var ratio = (event.clientX - relLeft) / event.target.clientWidth;
			var container = self.find_container(event.originalTarget);
			var audiotag = document.getElementById(container.dataset.ondeplayer);
			var seeked_time = ratio * audiotag.duration;
			self.show_thobber_at(container, seeked_time);
		},
		do_out : function(event) {
			self.hide_throbber(self.find_container(event.originalTarget));
		},

		do_throbble : function(event) {
			var container = self.find_container(event.target);
			var audiotag = document.getElementById(container.dataset.ondeplayer);
			var relLeft = event.target.getClientRects()[0].left;
			var ratio = (event.clientX - relLeft) / event.target.clientWidth;
			self.seekElementAt(audiotag, ratio * audiotag.duration)
		},
		do_pause : function(event) {
			var container = self.find_container(event.target);
			var audiotag = document.getElementById(container.dataset.ondeplayer);
			audiotag.pause();
			localStorage.removeItem(audiotag.currentSrc);
		},
		do_play : function(event) {
			var container = self.find_container(event.target);
			document.getElementById(container.dataset.ondeplayer).play();
		},
		do_onkey : function(event) {
			function seek_relative(seconds) {
				var seek_for = audiotag.currentTime + seconds;
				self.seekElementAt(audiotag, seek_for);
				self.show_thobber_at(container, seek_for);
				self.hide_throbber_later(container);
			}

			var container = self.find_container(event.target);
			var audiotag = document.getElementById(container.dataset.ondeplayer);
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
					seek_relative(- self.keymove);
					break;
				case 39 : // →
					seek_relative(+ self.keymove);
					break;
			}
		},
		absolutize_url : function(url) {
			var test_element = document.createElement('a');
			test_element.href = url;
			return test_element.href;
		},
		update_links : function(audiotag, container) {
			function ahref(category, href) {
				container._elements[category].href = href;
			}
			function remove_hash(canonical) {
				var hash_at = canonical.indexOf('#');
				return hash_at === -1 ? canonical : canonical.substr(0,hash_at);
			}

			var canonical = audiotag.dataset.canonical
			var url = (canonical === undefined ? '' : (remove_hash(canonical)) )
						+ '#' +audiotag.id 
						+ (audiotag.currentTime === 0 ? '' : ('&t='+self.convertSecondsInTime(audiotag.currentTime)));

			var _url = encodeURI(self.absolutize_url(url));
			var _title = encodeURI(audiotag.title);
			ahref('twitter', 'https://twitter.com/share?text='+_title+'&url='+_url+'&via=dascritch');
			ahref('facebook', 'https://www.facebook.com/sharer.php?t='+_title+'&u='+_url);
			ahref('email', 'mailto:?subject='+_title+'&body='+_url);
			ahref('link', audiotag.currentSrc);
			ahref('playlist', self.playlister);
		},
		show_actions : function(event) {
			var container = self.find_container(event.target);
			container._elements['pagemain'].style.display  = 'none';
			container._elements['pageshare'].style.display  = 'flex';
			self.update_links(document.getElementById(container.dataset.ondeplayer), container)
		},
		show_main : function(event) {
			var container = self.find_container(event.target);
			container._elements['pagemain'].style.display = 'flex';
			container._elements['pageshare'].style.display = 'none';
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
			var audiotag = document.getElementById(container.dataset.ondeplayer);
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
		element_attribute : function(element, key, missing) {
			return (element.attributes[key] === undefined) ? missing : element.attributes[key].value;
		},
		get_params_for_template : function(element) {
			if (element.dataset.canonical === undefined) {
				element.dataset.canonical = document.location.href;
			}
			var out = {
				// keys are stringed, as we need them not being modified
				'{{title}}'     	: element.title === '' ? ('<em>'+__.s('untitled')+'</em>') : element.title,
				'{{canonical}}' 	: self.absolutize_url(element.dataset.canonical),
				'{{poster}}' 		: self.absolutize_url(self.element_attribute(element,'poster', self.poster_fallback)),
				'{{classname}}' 	: self.container.classname,
				'{{playlister}}'	: self.playlister
			}
			return out;
		},
		rebuild : function(event) {
			var audiotag = event.target;
			function rebuild_container_id(element_id) {
				var container = document.getElementById(element_id);
				if (container.dataset.ondeplayer === undefined) {
					container.remove();
					self.build_for_audiotag(audiotag);
				} else {
					container.innerHTML = '';
					self.build_for_placeholder(container);
				}
			}
			audiotag._ondemiroir.forEach(rebuild_container_id);
		},
		add_id_to_container : function(container) {
			container.id = container.id !== ''? container.id : (self.container.idPrefix + String(self.count_element++));
		},
		add_id_to_audiotag : function(audiotag) {
			if (audiotag.id === '') {
				audiotag.id = self.dynamicallyAllocatedIdPrefix + String(self.count_element++);
			}
		},
		add_related_controller : function(audiotag, container) {
			self.add_id_to_container(container);
			if (audiotag._ondemiroir.indexOf(container.id) > -1) {
				return;
			}
			audiotag._ondemiroir.push(container.id);
		},

		build_controller : function(container, audiotag) {
			container.dataset.ondeplayer = audiotag.id;
			container.classList.add(self.container.classname);
			container.innerHTML = __.populate(
									__.populate(cpu_template),
									self.get_params_for_template(audiotag)
									);
			container.tabIndex = 0 // see http://snook.ca/archives/accessibility_and_usability/elements_focusable_with_tabindex and http://www.456bereastreet.com/archive/201302/making_elements_keyboard_focusable_and_clickable/

			// the following mess is to simplify sub element declaration and selection
			container._elements = {};
			querySelector_apply('*', function(element){
				element.classList.forEach(function(this_class) {
					if (this_class.indexOf(self.container.classname+'-')> -1) {
						var key  = this_class.substr(self.container.classname.length +1);
						container._elements[key] = element;
					}
				});
			}, container);

			self.add_related_controller(audiotag, container);
			var cliquables = {
				'pause'		: self.do_play,
				'play'		: self.do_pause,
				'time'		: self.do_throbble,
				'actions'	: self.show_actions,
				'back' 		: self.show_main,
				'cover'		: self.show_main,
				'playlist'	: self.add_playlist
			};
			for (var that in cliquables) {
				container._elements[that].addEventListener('click', cliquables[that]);
			}
			// key management
			container.addEventListener('keydown', self.do_onkey);
			// throbber management
			var timeline_element = container._elements['time'];
			var do_events = {
				'mouseover' : true,
				'mousemove' : true,
				'mouseout'  : false,

				'touchstart'  : true,
				// 'touchmove'   : true,
				'touchend'    : false,
				'touchcancel' : false,
			}
			for( var event_name in do_events) {
				timeline_element.addEventListener(event_name, do_events[event_name] ? self.do_hover : self.do_out);				
			}

			// throw simplified event
			self.show_main({target : container.querySelector('a')});
			self.update({target : audiotag});
			return container;
		},
		find_placeholders : function(container) {
			// NOTE : to use placeholders, you need to build a <div id data-ondeplayer="el-audio" >
			// AND you audio element SHOULD have an ID. Really
			var audiotag = document.getElementById(container.dataset.ondeplayer);
			if (audiotag === null) {
				return;
			}
			self.add_related_controller(audiotag, container);
			self.build_controller(container, audiotag);
		},
		build_for_audiotag : function(audiotag) {
			if (audiotag._ondemiroir === undefined) {
				audiotag._ondemiroir = []
			}
			// ask ASAP metadata about media
			// we have to set in HTML code preload="none" due to a bug in Chrome very lagging in HTTP2
			// https://stackoverflow.com/questions/14479413/chrome-ignoring-audio-preload-metadata
			//audiotag.preload = 'metadata';
			audiotag.load();
			self.add_id_to_audiotag(audiotag)

			var container = document.createElement(self.container.tagname)
			container.dataset.ondeplayer = audiotag.id;
			audiotag.parentNode.insertBefore(container, audiotag);

			var lasttimecode = Number(localStorage.getItem(audiotag.currentSrc));
			// TODO and no hashed time
			if (lasttimecode > 0) {
				self.seekElementAt(audiotag, lasttimecode);
				audiotag.play();
			}

			// see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events for list of events
			[
				'ready', 'load', 'loadeddata', 'canplay', 'abort', 
				// 'error', 'stalled', 'suspend', 'emptied',
				'play', 'playing', 'pause', 'suspend', 'ended',
				'durationchange',  'loadedmetadata', 'progress', 'timeupdate', 'waiting'
			].forEach( function(on){ audiotag.addEventListener(on, self.update); } );
			audiotag.addEventListener(self.rebuild_eventname, self.rebuild);

			self.update({target : audiotag})
			if (self.dontHideAudioTag === false) {
				audiotag.hidden = true;
				// PHRACK SAFARI
				audiotag.removeAttribute('controls');
				audiotag.setAttribute('data-ondeplayer','');
			}
			
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
				cpu_style += ' .{{classname}}-playlist { display : none; }';
			}
			element.innerHTML = __.populate(cpu_style, self.get_params_for_template(element));
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(element);
		},
		launch : function() {

			function find_playlister_from_js_scr(element) {
				var pos = element.src.indexOf('ondeplayer.js')
				if (pos>-1) {
					self.playlister = self.absolutize_url(element.src.substr(0, pos) + 'index.html');
					if (self.playlister === document.location.href.replace(/#.*$/,'')) {
						self.is_in_playlist = true;
					}
				}
			}

			if (document.getElementById(self.styleId) !== null) {
				// injected <style> is already there, ondeplayer is maybe already loaded
				return ;
			}
			if (!self.playlister) {
				querySelector_apply('script[src]', find_playlister_from_js_scr);
			}
			//new CustomEvent(self.rebuild_eventname);
			querySelector_apply(self.selector_media, self.build_for_audiotag);
			querySelector_apply(self.selector_container, self.find_placeholders);
			self.insertStyle();
			querySelector_apply('.'+self.container.classname+'-canonical', self.element_prevent_link_on_same_page);
			self.hashOrder({ at_start : true });
			window.addEventListener( 'hashchange', self.hashOrder, false);
		}
	};

	prepare_i18n();

	if (document.body !== null) {
		self.launch();
	} else {
		document.addEventListener( 'DOMContentLoaded', self.launch, false);
	}

	return self;
}();
