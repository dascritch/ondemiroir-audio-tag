// Author : Xavier “dascritch” Mouton-Dubosc http://dascritch.com for l'Onde Mirroir / Radio FMR
// Licence : GPL
'use strict';

(function(document, window){

	window.name = 'onde_miroir_player';
	
	/**
	 * TODO
	 * if playing sound, indicate in window title
	 *
	 * **/
	
    var player = {
		template : '',
		listing : null,
		audiotag : null,
		window_title : document.title,
		playing : { title : '' },
		add_item : function(entry) {
			var inner = player.template;
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
		build_playlist : function() {
			player.listing.innerHTML = '';
			try {
				player.list = JSON.parse(localStorage.getItem('playlist'));
			} catch(e) {
				player.list = []
			}
			if (player.list.length == 0) {
				// proposer 10 sonores au hasard ou écouter le flux
				return;
			}
			for (var line in player.list) {
				if (player.list.hasOwnProperty(line)) {
					var entry = player.list[line];
					player.listing.appendChild(player.add_item(entry));
				}
			}
		},
		reset_playlist : function() {
			localStorage.setItem('playlist',null);
			player.build_playlist();
		},
		update_title : function() {
			var status = player.audiotag.paused ? '▮▮' : '▶';
			document.title =  status + ' ' +player.playing.title + ' — ' + player.window_title;
		},
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
		playfirst : function() {
			var now = player.listing.querySelector('article')
			if (now === null) {
				player.playing = { title : ''};
				return;
			}
			player.audiotag.src = now._player.src;
			player.playing = now._player;
			player.audiotag.play();
			// player.update_title();
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
		get_template : function() {
			player.template = document.getElementById('template').innerHTML;
		},
		install : function() {
			player.listing = document.querySelector('main');
			player.audiotag = document.querySelector('audio');
			var triggers = ['error','play','pause','suspend'];
			for(var pos in triggers) {
				if (triggers.hasOwnProperty(pos)) {
					player.audiotag.addEventListener(triggers[pos],player.update_title);
				}
			}
			player.get_template();
			player.build_playlist();
			player.playfirst();
			//player.update_title();
			document.getElementById('reset').addEventListener('click', player.reset_playlist)
			player.listing.addEventListener('dragover',player.drag_over_playlist)
			player.listing.addEventListener('dragleave',player.drag_out_playlist)
			
		},
    }
    window.addEventListener('DOMContentLoaded', player.install);
	window.addEventListener('storage', player.build_playlist);


})(document, window);

function push_in_playlist(data) {
	// interface visible
	'use strict';
	alert('hi')
	/** TODO
	 * vérifier les clés entrantes
	 * vérifier les NDD des images, liens et sources
	 * éviter un double push si déjà présent dans la playlist
	 * */
}