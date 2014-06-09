# TimecodeHash : hashtag adaptation for `<audio></video>`

Purpose : permt to do a hotlink or a deeplink.
Just link as you usualy do to a named anchor, then add `@` and the timecode you want the player to jump to.
By example, going to `page.html#player@100` will start any playable element of page.html named "player" at the 100th second.

For the timecode, you can give seconds without unit or use human-readable units as in `page.html#player@1m40s` for the previous example. Sub-units availables : `s`econds, `m`inutes, `h`ours and `d`ays

Note : if no named anchor is given and a timecode , as in `href="#@13h37m"`, the very first `<audio>`/`<video>` element of the document will be started and placed at this time.

# Licence
This software is under GNU General Purpose Licence.
Use it and deploy it as you want : i've done too much closed source before.
