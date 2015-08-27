// Author : Xavier “dascritch” Mouton-Dubosc http://dascritch.com for l'Onde Mirroir / Radio FMR
// Licence : GPL
'use strict';

//(function(document, window){

	// if was not set, force it, for not having double call. Case of a direct call
	window.name = 'onde_miroir_player';

	/**
	 * TODO
	 * if playing sound, indicate in window title
	 *
	 * **/

	 var template =
			'<h3><button type="button" class="remove">×</button> <button type="button" class="move">↕</button> {{title}}</h3>'
			+'<img src="{{cover}}" alt="" />'
				+'<a href="{{canonical}}" target="verspage">page associée</a>';

	var player = {
		storage_key : 'playlist',
		rebuild_eventname : 'ondemiroir.rebuild',
		listing : null,
		audiotag : null,
		window_title : document.title,
		playing : { title : '' },
		load_playlist : function() {
			try {
				player.list = JSON.parse(localStorage.getItem(player.storage_key));
			} catch(e) {
				player.list = null;
			}
			if ((player.list === null) || (typeof player.list !== 'object') || (player.list.length === undefined)) {
				player.list = [];
				player.save_playlist();
			}
			if (player.list.length == 0) {
				// proposer 10 sonores au hasard ou écouter le flux
				return;
			}
		},
		save_playlist : function(data) {
			localStorage.setItem(player.storage_key, JSON.stringify(player.list))
			player.draw_playlist();
		},
		push_in_playlist : function(data) {
			/** TODO
			 * vérifier les clés entrantes
			 * vérifier les NDD des images, liens et sources
			 * éviter un double push si déjà présent dans la playlist
			 * */
			console.info('push in ',data);
			player.list.push(data);
			if (data.length === 1) {
				player.get_next_to_play();
			}
			player.save_playlist();
		},
		get_next_to_play : function() {
			if (player.list === undefined) {
				player.playing = undefined;
				return;
			}
			player.playing = player.list.shift();
			player.save_playlist();
			console.info('next to play ',player.playing);
			if ((player.playing === undefined) || (player.playing.src === undefined)) {
				return;
			}

			player.audiotag.src = player.playing.src;
			player.audiotag.title = player.playing.title;
			player.audiotag.dataset.canonical = player.playing.canonical;
			player.audiotag.attributes['poster'] = player.playing.cover;
			player.audiotag.dispatchEvent(new Event(player.rebuild_eventname));
			player.audiotag.play();
		},
		reset_playlist : function() {
			player.list = [];
			player.save_playlist();
		},
		fast_foward_to_next : function() {
			player.draw_playlist();
		},
		draw_item : function(entry) {
			var inner = template;
			for (var key in entry) {
				if (entry.hasOwnProperty(key)) {
					inner = inner.replace(RegExp('{{'+key+'}}'), entry[key]);
				}
			}
			var article = document.createElement('article');
			article.draggable = true;
			article.setAttribute('draggable', 'true');
			article._player = entry;
			article.innerHTML = inner;
			article.addEventListener('dragstart', player.dragging);
			article.querySelector('.remove').addEventListener('click', player.remove_article);
			return article;
		},
		draw_playlist : function() {
			player.listing.innerHTML = '';
			player.load_playlist();
			for (var line in player.list) {
				if (player.list.hasOwnProperty(line)) {
					var entry = player.list[line];
					player.listing.appendChild(player.draw_item(entry));
				}
			}
		},

		/*
		update_title : function() {
			/// SHOULD MOVE to ondemiroir-audio-tag.js
			var status = player.audiotag.paused ? '▮▮' : '▶';
			document.title =  status + ' ' +player.playing.title + ' — ' + player.window_title;
		},
		*/
		remove_item : function(url) {
			var id = 0;
			while (id < player.list.length) {
				if (player.list[id].canonical === url) {
					player.list.splice(id, 1);
				}
				id++;
			}
			console.log(player.list);
			localStorage.setItem('playlist',JSON.stringify(player.list));
		},
		remove_article : function(event) {
			console.log(event)
			var article = event.target
			while(article.tagName !== 'ARTICLE') {
				article = article.parentNode;
			}
			player.remove_item(article._player.src)
			article.parentNode.removeChild(article);
		},
		dragging : function(event) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text/uri-list', event.target._player.src);
		},
 		drag_over_playlist : function(event) {
			player.listing.style.background = 'yellow';
		},
 		drag_out_playlist : function(event) {
			player.listing.style.background = 'white';
		},
		install : function() {
			player.listing = document.querySelector('main');
			player.audiotag = document.querySelector('audio');
			player.draw_playlist();
			player.get_next_to_play();
			document.getElementById('reset').addEventListener('click', player.reset_playlist);
			document.getElementById('ff').addEventListener('click', player.fast_foward_to_next);
			player.listing.addEventListener('dragover',player.drag_over_playlist)
			player.listing.addEventListener('dragleave',player.drag_out_playlist)
		},
	}

	// interface visible
    window.push_in_playlist = player.push_in_playlist;
    // starters
    window.addEventListener('DOMContentLoaded', player.install);
	window.addEventListener('storage', player.draw_playlist);


//})(document, window);

