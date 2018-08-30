Onde Miroir <audio> tag
=======================

This project is obsolete, kept for historical reasons. [See cpu-audio instead](https://github.com/dascritch/cpu-audio)

Author :  [Xavier "dascritch" Mouton-Dubosc](http://dascritch.com)

Version : 0

Thank you to my lovely friends
* [Thomas Parisot](https://oncletom.io/) for suggestions
* [Loïc Gerbaud](https://github.com/chibani) for corrections
* [Guillaume Lemoine and Phonitive](http://www.phonitive.fr/) for helping
* [Benoît Salles](https://twitter.com/infestedgrunt) for testing

Informations in french : <http://dascritch.net/post/2014/09/03/Timecodehash-%3A-Lier-vers-un-moment-d-un-sonore>

Purpose
-------

This is an hashtag extention for `<audio>`, derivated from timecodehash.js
It could have been done via HTML templates, with a polyfill like the excellent Bosonic, but I wanted a plain vanilla, easy to install and configure.

Simply put `<script src="src/ondeplayer.js"></script>` in the head of your html page.

It will replace any `<audio control>` by an specialy crafted UI. Some attributes enhance the component :

- `title="<string>"` : Name of the audio
- `poster="<url>"` : Cover image
- `data-canonical="<url>"` : link to the original page of the sound

The script will link automatically to the playlister in the same repertory.

Cloned player : You can invoke a cloned player by giving an id to the `<audio>` tag, then create an empty `<div>` with an `data-ondeplayer=` attribute, reffering to the id of the `<audio>` tag.

Todo
----

- Support for elapsed time / countdown time / total time
- Explanation about cross domain . cf [CORS on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) and [enable CORS](http://enable-cors.org/server_apache.html) . Or switch to [custom event based](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

Build
-----

Any related source to the player is in `src/ondeplayer*.js`

You will need Google's Closure compiler to produce distribuable files. Use `make.sh` to compile/backport code to ECMA 5.

Ready to deploy files will be in `dist` repertory.

Licence
-------

Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc

This software is licenced under the [GNU General Purpose Licence](http://www.gnu.org/licenses/gpl-3.0.txt).
Use it and deploy it as you want : i've done too much closed source before.

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

Versions
--------
* August 2017 : 4 , i18n, modularization, clone
* August 2015 : 3 , forking to ondemiroir-audio-tag
* September 2014 : 2 , correcting to standard separator
* September 2014 : 1 , public announcing
* July 2014 : 1.a , public release
* June 2014 : 0.2 , proof of concept
* October 2012 : first version, trashed

Repository : <https://github.com/dascritch/ondemiroir-audio-tag>

Keeping in touch :
* professional <http://dascritch.com>
* blog <http://dascritch.net>
* twitter : [@dascritch](https://twitter.com/dascritch)
