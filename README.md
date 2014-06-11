TimecodeHash
============

Author :  [Da Scritch](http://dascritch.com)

Version : 0.2

Purpose
-------

This is an hashtag extention for `<audio></video>`, permits to do a hotlink or a deeplink.

How to
------

Just link as you usualy do to a named anchor, then add `@` and the timecode you want the player to jump to.
By example, going to `page.html#player@100` will start any playable element of page.html named "player" at the 100th second.

Permitted notations
-------------------

For the timecode, you can use
* seconds without unit : `page.html#player@7442`
* pofessionnal timecodes as `02:04:02` (2 hours, 4 minutes and 2 seconds) : `page.html#player@02:04:02`
* human-readable units as in `page.html#player@2h4m2s` for the previous example. Sub-units availables : `s`econds, `m`inutes, `h`ours and `d`ays

Note : if no named anchor is given and a timecode , as in `href="#@13h37m"`, the very first `<audio>`/`<video>` element of the document will be started and placed at this time.

Example page : http://dascritch.github.io/timecodehash/index.html

Via the API and only for the API at this time, you can change the separator from `@` to any accepted unicode character, p.e. `;`, `‣` or `♪`.

Licence
-------

This software is licenced under the [GNU General Purpose Licence](http://www.gnu.org/licenses/gpl-3.0.txt).

Use it and deploy it as you want : i've done too much closed source before.

Versions
--------
* October 2012 : first version, trashed
* June 2014 : 0.2 , public release