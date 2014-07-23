TimecodeHash
============

Author :  [Xavier "dascritch" Mouton-Dubosc](http://dascritch.com)

Version : 1

Thank you to my lovely friends
* [Thomas Parisot](https://oncletom.io/) for suggestions
* [Loïc Gerbaud](https://github.com/chibani) for corrections
* [Benoît Salles](https://twitter.com/infestedgrunt) for testing

Purpose
-------

This is an hashtag extention for `<audio></video>`, permits to do a hotlink or a deeplink.

Features
--------

Link to an hash with a timecode to point the media player to the desired time. The main difference with standard media fragment is to permit external link to your page at a precise moment of your media.

Example page : <http://dascritch.github.io/timecodehash/index.html>

Blog post to come after August.

How to
------

First, call the library as usual in your html where you want to address your players, preferably in the `<head>` section :
```
<script src="timecodehash.js"></script>
```

Just link as you usually do to a named anchor, then add `@` and the timecode you want the player to jump to.
By example, triggering `<a href="page.html#player@100">` will start any playable element of page.html named "player" at the 100th second. The referred page.html should have a call to the library, the referrent doesn't need it.

Permitted notations
-------------------

For the timecode, you can use
* seconds without unit : `page.html#player@7442`
* professionnal timecodes as `02:04:02` (2 hours, 4 minutes and 2 seconds) : `page.html#player@02:04:02`
* human-readable units as in `page.html#player@2h4m2s` for the previous example. Sub-units availables : `s`econds, `m`inutes, `h`ours and `d`ays

Note : if a timecode without named anchor is given, as in `href="#@13h37m"`, the very first `<audio>`/`<video>` element of the document will be started and placed at this time.

Via the API and only for the API at this time, you can change the separator from `@` to any accepted unicode character, p.e. `;`, `‣` or `♪`.

Production notes
----------------

Firefox do large media seeking without any problems. But Chrome is not handling very easily. So TDD tests where switched laterly in async mode and `.jumpElementAt` and `hashOrder` have a callback function to test it properly.

A contrario, Firefox seems doing a refresh loading when I use media frangment.

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
* July 2014 : 1 , public release
* June 2014 : 0.2 , proof of concept
* October 2012 : first version, trashed

Repository : <https://github.com/dascritch/timecodehash>

Keeping in touch :
* professional <http://dascritch.com>
* blog <http://dascritch.net>
* twitter : [@dascritch](https://twitter.com/dascritch)
