'use strict';var module$ondeplayer_css={},cpu_style$$module$ondeplayer_css='\n\n.{{classname}} {\n\tfont-family : Lato, "Open Sans", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif !important;\n\tfont-size : 15px !important;\n}\n\n.{{classname}}, .{{classname}} * {\n\tline-height : 1.2 !important;\n\tborder : none !important;\n\tpadding : 0 !important;\n\tmargin : 0 !important;\n\ttransition : none !important;\n\tmoz-user-select: none;\n\tms-user-select: none;\n\twebkit-user-select: none;\n\tuser-select: none;\n}\n\n.{{classname}} {\n\tdisplay : flex;\n\tbackground : #555;\n\tcolor : #ccc;\n\theight : 64px;\n}\n\n.{{classname}}.{{classname}}-act-error {\n\tcolor : #cc0;\n}\n\n.{{classname}} a {\n\tcolor : #aaf;\n\tborder : none !important;\n\ttext-decoration : none;\n}\n.{{classname}} svg {\n  \tfill : #ffffff;\n  \twidth:64px;\n\theight : 64px;\n}\n.{{classname}} a:hover {\n\tcolor : #555;\n\tbackground : #aaf;\n}\n.{{classname}} a:hover svg {\n\tfill : #555;\n}\n.{{classname}}-loading, .{{classname}}-play, .{{classname}}-pause {\n\twidth : 0px;\n}\n\n.{{classname}}-act-loading .{{classname}}-loading,\n.{{classname}}-act-play .{{classname}}-play,\n.{{classname}}-act-pause .{{classname}}-pause,\n.{{classname}}-actions,\n.{{classname}}-back {\n\tflex : 0 0 64px;\n\twidth : 64px;\n\tmax-height : 64px;\n\theight : 100%;\n\ttext-align : center;\n\tvertical-align : middle;\n}\n.{{classname}}-actions,\n.{{classname}}-back {\n\tcursor : pointer;\n}\n\n.{{classname}}-act-loading .{{classname}}-loading circle:nth-child(1) {\n\t  animation: {{classname}}-pulse0 2s infinite;\n}\n\n.{{classname}}-act-loading .{{classname}}-loading circle:nth-child(2) {\n\t  animation: {{classname}}-pulse1 2s infinite;\n}\n\n.{{classname}}-act-loading .{{classname}}-loading circle:nth-child(3) {\n\t  animation: {{classname}}-pulse2 2s infinite;\n}\n\n@keyframes {{classname}}-pulse0 {\n    0% {\n        opacity : 1;\n    }\n    50% {\n        opacity : 0;\n    }\n    100% {\n        opacity : 1;\n    }\n}\n\n@keyframes {{classname}}-pulse1 {\n    0% {\n        opacity : 0.75;\n    }\n    12% {\n        opacity : 1;\n    }\n    62% {\n        opacity : 0;\n    }\n    100% {\n        opacity : 0.75;\n    }\n}\n\n@keyframes {{classname}}-pulse2 {\n    0% {\n        opacity : 0.5;\n    }\n    25% {\n        opacity : 1;\n    }\n    75% {\n        opacity : 0;\n    }\n    100% {\n        opacity : 0.5;\n    }\n}\n\n@keyframes {{classname}}-pulse4 {\n    0% {\n        opacity : 0.25;\n    }\n    37% {\n        opacity : 1;\n    }\n    87% {\n        opacity : 0;\n    }\n    100% {\n        opacity : 0.5;\n    }\n}\n\n.{{classname}}-cover {\n\twidth : 64px;\n }\n\n.{{classname}}-poster {\n\twidth : 64px;\n\theight : 64px;\n\tobject-fit: contain;\n}\n\n.{{classname}}-loading svg, .{{classname}}-play svg, .{{classname}}-pause svg, .{{classname}}-actions svg {\n\tvertical-align : middle;\n\tmax-width : 100%;\n\tmax-height : 100%;\n}\n.{{classname}}-titleline {\n\tdisplay : flex;\n}\n.{{classname}}-about, .{{classname}}-title {\n\tflex : 1 1 100%;\n\tposition : relative;\n}\n.{{classname}}-title a {\n    display : block;\n\ttext-overflow : ellipsis;\n\tmax-height: 48px;\n\toverflow: hidden;\n\n}\n.{{classname}}-elapse {\n\tflex : 1 0 180px;\n\ttext-align : right;\n}\n.{{classname}}-time {\n\tbackground : black;\n\twidth : 100%;\n\theight : 10px;\n\tdisplay : block;\n\tborder-radius : 4px;\n\tposition : relative;\n\tcursor:none;\n}\n.{{classname}}-loadingline,\n.{{classname}}-elapsedline {\n\tbackground : white;\n\theight : 10px ;\n\tdisplay : block ;\n\tposition : absolute;\n\tleft : 0;\n\tborder-radius : 4px;\n\tpointer-events : none;\n}\n\n.{{classname}}-act-loading .{{classname}}-loadingline {\n\tanimation: {{classname}}-pulse3 2s infinite;\n}\n.{{classname}}-pagemain, .{{classname}}-pageshare, .{{classname}}-share {\n\tflex : 1 1 100%;\n\tdisplay : flex;\n\talign-items: center;\n}\n.{{classname}}-share {\n\ttext-align : center;\n}\n\n.{{classname}}-share a {\n\theight : 64px;\n}\n\n.{{classname}}-share a, .{{classname}}-share div {\n\tflex : 1 0;\n\tcolor : white;\n\ttext-decoration : none;\n\toverflow : hidden;\n\ttext-overflow : clip;\n}\n.{{classname}}-share svg {\n\tvertical-align : middle;\n  \t\twidth:32px;\n\t\theight : 32px;\n}\n.{{classname}}-twitter {background : #4DB5F4}\n.{{classname}}-facebook {background : #5974CC}\n.{{classname}}-email {background : #CC0000}\n.{{classname}}-link {background : #77F}\n\n@media screen and (max-width: 640px) {\n\n\t.{{classname}} {\n\t\theight : 32px;\n\t\tfont-size : 12px;\n\t}\n\n  \t.{{classname}}-nosmall {\n\t\tdisplay : none;\n  \t}\n\t.{{classname}}-act-loading .{{classname}}-loading,\n\t.{{classname}}-act-play .{{classname}}-play,\n\t.{{classname}}-act-pause .{{classname}}-pause,\n\t.{{classname}}-actions {\n\t\tflex : 0 0 32px;\n\t\theight : 32px;\n\t\twidth : 32px;\n\t}\n\t.{{classname}} svg {\n  \t\twidth:32px;\n\t\theight : 32px;\n\t}\n\t.{{classname}}-title a {\n\t\tmax-height : 16px;\n\t}\n\n  \t.{{classname}}-elapse {\n  \t\tflex : 1 0 90px;\n\t\tmax-height : 16px;\n  \t}\n\n  \t.{{classname}}-share a {\n\t\theight : 32px;\n\t}\n}\n@media screen and (max-width: 319px) {\n\t.{{classname}}-elapse {\n\t\tdisplay : none;\n\t}\n}\n\n@media print {\n\t.{{classname}} {\n\t\tdisplay : none;\n\t}\n}\n\n.{{classname}}-popup {\n\tposition: absolute;\n\ttransform: translate(-25px, 20px);\n\tz-index : 127;\n\tmin-width : 50px;\n\tfont-size : 11px;\n\ttext-align : center;\n\tpadding : 4px;\n\tborder-radius: 4px;\n\tbackground : #ccc;\n\tcolor : #555;\n\topacity : 0;\n\ttransition : opacity 1s;\n\tpointer-events : none;\n\t/* absolute pos, need to repeat it \u2192  https://developer.mozilla.org/en-US/docs/Web/CSS/user-select */\n\tmoz-user-select: none;\n\tms-user-select: none;\n\twebkit-user-select: none;\n\tuser-select: none;\n} \n\n.{{classname}}-popup:before {\n\tcontent:"";\n\tposition: absolute;\n\tleft: 20px;\n\ttop: -16px;\n\theight : 0;\n\twidth: 0;\n\tborder-bottom: 16px solid #ccc;\n\tborder-left: 8px solid transparent;\n\tborder-right: 8px solid transparent;\n\tpointer-events : none;\n} \n\n',
$jscompDefaultExport$$module$ondeplayer_css=cpu_style$$module$ondeplayer_css;module$ondeplayer_css.default=$jscompDefaultExport$$module$ondeplayer_css;var module$ondeplayer_html={},cpu_template$$module$ondeplayer_html='\n<img class="{{classname}}-poster {{classname}}-nosmall" src="{{poster}}" alt="{{cover}}" />\n<div class="{{classname}}-pagemain">\n\t<div class="{{classname}}-loading">{{svg:loading}}</div>\n\t<a class="{{classname}}-play">{{svg:play}}</a>\n\t<a class="{{classname}}-pause">{{svg:pause}}</a>\n\t<div class="{{classname}}-about">\n\t\t<div class="{{classname}}-titleline">\n\t\t\t<div class="{{classname}}-title"><a href="{{canonical}}" class="{{classname}}-canonical" title="{{title}}">{{title}}</a></div>\n\t\t\t<a class="{{classname}}-elapse">\u2026</a>\n\t\t</div>\n\t\t<div class="{{classname}}-line">\n\t\t\t<div class="{{classname}}-time">\n\t\t\t\t<div class="{{classname}}-loadingline"></div>\n\t\t\t\t<div class="{{classname}}-elapsedline"></div>\n\t\t\t\t<time class="{{classname}}-popup">--:--</time>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\t<a class="{{classname}}-actions">{{svg:share}}</a>\n</div>\n<div class="{{classname}}-pageshare">\n\t<div class="{{classname}}-share">\n\t\t<a href="#" target="social" class="{{classname}}-twitter {{classname}}-nosmall" title="{{twitter}}">{{svg:twitter}}<span>{{twitter}}</span></a>\n\t\t<a href="#" target="social" class="{{classname}}-facebook {{classname}}-nosmall" title="{{facebook}}">{{svg:facebook}}<span>{{facebook}}</span></a>\n\t\t<a href="#" target="social" class="{{classname}}-email" title="{{email}}">{{svg:email}}<span>{{e-mail}}</span></a>\n\t\t<a href="{{playlister}}" target="onde_miroir_player" class="{{classname}}-playlist" title="{{playlist}}">{{svg:play}}<span>{{playlist}}</span></a>\n\t\t<a href="#" target="social" class="{{classname}}-link" title="{{download}}">{{svg:download}}<span>{{download}}</span></a>\n\t\t<a class="{{classname}}-back" title="{{back}}">{{back}}</a>\n\t</div>\n</div>\n',
$jscompDefaultExport$$module$ondeplayer_html=cpu_template$$module$ondeplayer_html;module$ondeplayer_html.default=$jscompDefaultExport$$module$ondeplayer_html;var module$ondeplayer_i18n={},cpu_i18n$$module$ondeplayer_i18n={"-":{},fr:{untitled:"(sans titre)",cover:"pochette",more:"Partager",twitter:"Partager sur Twitter",facebook:"Partager sur Facebook","e-mail":"Partager par e-mail",playlist:"\u00c9couter plus tard",download:"T\u00e9l\u00e9charger",back:"Annuler",media_err_aborted:"Vous avez annul\u00e9 la lecture.",media_err_network:"Une erreur r\u00e9seau a caus\u00e9 l'interruption du t\u00e9l\u00e9chargement.",media_err_decode:"La lecture du sonore a \u00e9t\u00e9 annul\u00e9e suite \u00e0 des probl\u00e8mes de corruption ou de fonctionnalit\u00e9s non support\u00e9s par votre navigateur.",
media_err_src_not_supported:"Le sonore n'a pu \u00eatre charg\u00e9, soit \u00e0 cause de sourcis sur le serveur, le r\u00e9seau ou parce que le format n'est pas support\u00e9.",media_err_unknow:"Erreur due \u00e0 une raison inconnue"},en:{untitled:"(untitled)",cover:"cover",more:"Share",twitter:"Share on Twitter",facebook:"Share on Facebook","e-mail":"Share by e-mail",playlist:"Listen later",download:"Download",back:"Back",media_err_aborted:"You aborted the video playback.",media_err_network:"A network error caused the audio download to fail.",
media_err_decode:"The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.",media_err_src_not_supported:"The video audio not be loaded, either because the server or network failed or because the format is not supported.",media_err_unknow:"Erreur due \u00e0 une raison inconnue"}},$jscompDefaultExport$$module$ondeplayer_i18n=cpu_i18n$$module$ondeplayer_i18n;module$ondeplayer_i18n.default=$jscompDefaultExport$$module$ondeplayer_i18n;var module$__$__={},__$$module$__$__={i18n:{},prefered_language_order:[],_key:function(d){return"{{"+d+"}}"},has_key:function(d){return __$$module$__$__._key(d)in __$$module$__$__.i18n},bracket_keys:function(d){var f={},b;for(b in d)f[__$$module$__$__._key(b)]=d[b];return f},push_prefered_language:function(d){0>__$$module$__$__.prefered_language_order.indexOf(d)&&__$$module$__$__.prefered_language_order.push(d)},prefered_language:function(){return __$$module$__$__.prefered_language_order[1]},_add_locale:function(d,
f){if(null!==f&&void 0!==f[d]){for(var b in f[d])__$$module$__$__.i18n[__$$module$__$__._key(b)]=f[d][b];__$$module$__$__.push_prefered_language(d)}},s:function(d,f){d=__$$module$__$__._key(d);return void 0===f?__$$module$__$__.i18n[d]:__$$module$__$__.i18n[d][f]},populate:function(d,f){f=void 0===f?__$$module$__$__.i18n:f;for(var b in f)d=null===d?"":d.replace(RegExp(b,"g"),f[b]);return d},date:function(d){d=new Date(d);d=__$$module$__$__.bracket_keys({dayofmonth:toInt(d.getDate()),month:__$$module$__$__.s("_month")[d.getMonth()],
year:d.getFullYear()});return __$$module$__$__.populate(__$$module$__$__.s("_date"),d)},merge_source:function(d){__$$module$__$__._add_locale("-",d);var f=window.navigator.languages;f=void 0!==f?f:[navigator.language||navigator.browserLanguage];var b=!1,a;for(a in f){var c=f[a];c.split&&(c=c.split("-")[0],b||"object"!==typeof d||null===d||void 0===d[c]||(__$$module$__$__._add_locale(c,d),b=!0))}return b}},$jscompDefaultExport$$module$__$__=__$$module$__$__;module$__$__.default=$jscompDefaultExport$$module$__$__;var module$ondeplayer_svg={},cpu_svg$$module$ondeplayer_svg={pause:'<path d="M 6,6 6,26 26,16 z" />',play:'<path d="M 6,6 12.667,6 12.667,26 6,26 z" /><path d="M 19.333,6 26,6 26,26 19.333,26 z" />',stop:'<path d="M 6,6 6,26 26,26 26,6 z" />',loading:'<circle cx="6" cy="22" r="4" fill="#777777" /><circle cx="16" cy="22" r="4" fill="#777777" /><circle cx="26" cy="22" r="4" fill="#777777" />',share:'<circle cx="12" cy="10" r="4" /><circle cx="12" cy="22" r="4" /><circle cx="23" cy="16" r="4" /><polygon points="12,8 24,14 24,18 12,12"/><polygon points="12,20 24,14 24,18 12,24"/>',
facebook:'<path d="m 21.117,16.002 -3.728,0 0,10.027 -4.297,0 0,-10.027 -2.070,0 0,-3.280 2.070,0 0,-2.130 c 0,-2.894 1.248,-4.616 4.652,-4.616 l 3.922,0 0,3.549 -3.203,0 c -0.950,-0.001 -1.068,0.495 -1.068,1.421 l -0.005,1.775 4.297,0 -0.568,3.280 0,2.34e-4 z" />',twitter:'<path d="M 25.941,9.885 C 25.221,10.205 24.448,10.422 23.637,10.520 24.465,10.020 25.101,9.230 25.401,8.288 24.626,8.750 23.768,9.086 22.854,9.267 22.122,8.483 21.080,7.993 19.926,7.993 c -2.215,0 -4.011,1.806 -4.011,4.034 0,0.316 0.035,0.623 0.103,0.919 -3.333,-0.168 -6.288,-1.774 -8.267,-4.215 -0.345,0.596 -0.542,1.289 -0.542,2.028 0,1.399 0.708,2.634 1.784,3.358 -0.657,-0.020 -1.276,-0.202 -1.816,-0.504 -3.98e-4,0.016 -3.98e-4,0.033 -3.98e-4,0.050 0,1.954 1.382,3.585 3.217,3.955 -0.336,0.092 -0.690,0.141 -1.056,0.141 -0.258,0 -0.509,-0.025 -0.754,-0.072 0.510,1.602 1.991,2.769 3.746,2.801 -1.372,1.082 -3.102,1.726 -4.981,1.726 -0.323,0 -0.642,-0.019 -0.956,-0.056 1.775,1.144 3.883,1.812 6.148,1.812 7.377,0 11.411,-6.147 11.411,-11.478 0,-0.174 -0.004,-0.348 -0.011,-0.522 0.783,-0.569 1.463,-1.279 2.001,-2.088 z" />',
email:'<path d="m 8.030,8.998 15.920,0 c 0.284,0 0.559,0.053 0.812,0.155 l -8.773,9.025 -8.773,-9.026 c 0.253,-0.101 0.528,-0.155 0.812,-0.155 z m -1.990,12.284 0,-10.529 c 0,-0.036 0.002,-0.073 0.004,-0.109 l 5.835,6.003 -5.771,5.089 c -0.045,-0.146 -0.068,-0.298 -0.069,-0.453 z m 17.910,1.754 -15.920,0 c -0.175,0 -0.348,-0.020 -0.514,-0.060 l 5.662,-4.993 2.811,2.892 2.811,-2.892 5.662,4.993 c -0.165,0.039 -0.338,0.060 -0.514,0.060 z m 1.990,-1.754 c 0,0.155 -0.023,0.307 -0.068,0.453 l -5.771,-5.089 5.835,-6.003 c 0.002,0.036 0.004,0.073 0.004,0.109 z" />',
download:'<path d="M 6,6 26,6 16,26 z" /><rect x="6" y="22" width="20" height="4" />'},$jscompDefaultExport$$module$ondeplayer_svg=cpu_svg$$module$ondeplayer_svg;module$ondeplayer_svg.default=$jscompDefaultExport$$module$ondeplayer_svg;/*

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
var module$ondeplayer={};
window.OndeMiroirAudio=function(){function d(a,b,e){e=void 0===e?document:e;[].forEach.call(e.querySelectorAll(a),b)}""!==document.domain&&(document.domain=document.domain.replace(/^(.*\.)?(\w+\.\w+)$/,"$2"));if(void 0!==document.querySelector&&"oncanplay"in window&&[].forEach&&window.matchMedia("screen").matches){var f={d:86400,h:3600,m:60,s:1},b={selector_media:"audio[controls]",selector_fallback:"audio[data-ondeplayer]",selector_container:"div[data-ondeplayer]",dynamicallyAllocatedIdPrefix:"OndeMiroirAudio-tag-",container:{tagname:"div",
idPrefix:"OndeMiroirAudio-Player-",classname:"OndeMiroirAudio-Player"},dontHideAudioTag:!1,menuId:"OndeMiroirAudio-menu",styleId:"OndeMiroirAudio-style",poster_fallback:"//dascritch.net/themes/DSN13/img/entete1.svg",playlister:!1,playlist_window:!1,is_in_playlist:!1,rebuild_eventname:"ondemiroir.rebuild",keymove:5,count_element:0,only_play_one_audiotag:!0,current_audiotag_playing:null,convertTimeInSeconds:function(a){return/^\d+$/.test(a)?Number(a):-1===a.indexOf(":")?this.convertSubunitTimeInSeconds(a):
this.convertColonTimeInSeconds(a)},convertSubunitTimeInSeconds:function(a){var b=0,e;for(e in f)f.hasOwnProperty(e)&&-1!==a.indexOf(e)&&(a=a.split(e),b+=Number(a[0].replace(/\D*/g,""))*f[e],a=a[1]);return b},convertColonTimeInSeconds:function(a){var b=0;a=a.split(":");for(var e=[1,60,3600,86400],g=0;g<a.length;g++)b+=Number(a[g])*e[a.length-1-g];return b},convertSecondsInTime:function(a){var b="",e=!1,g;for(g in f)if(f.hasOwnProperty(g)){var d=f[g];if(a>=d||e){e=!0;var h=Math.floor(a/d);b+=h+g;a-=
h*d}}""===b&&(b="0s");return b},seekElementAt:function(a,c){if(void 0!==a.fastSeek)a.fastSeek(c);else try{a.currentTime=c}catch(e){a.src=a.currentSrc.split("#")[0]+"#t="+c}a._ondemiroir.forEach(function(e){e=document.getElementById(e);b.update_line(a,e,"loading",c);b.update_act_container("loading",e)})},jumpIdAt:function(a,c,e){function g(a){var b=a.target;b.play();void 0!==a.preventDefault&&b.removeEventListener("canplay",g,!0);"function"===typeof e&&e()}function d(a){void 0!==a.preventDefault&&
f.removeEventListener("loadedmetadata",d,!0);a=b.convertTimeInSeconds(c);b.seekElementAt(f,a);f.readyState>=f.HAVE_FUTURE_DATA?g({target:f}):f.addEventListener("canplay",g,!0);b.update({target:f})}var f=""!==a?document.getElementById(a):document.querySelector(this.selector_fallback);if(void 0===f||null===f||void 0===f.currentTime)return!1;f.readyState<f.HAVE_CURRENT_DATA?(f.addEventListener("loadedmetadata",d,!0),f.load()):d({});b.update({target:f})},hashOrder:function(a,c){var e=!0;"string"!==typeof a&&
(e="at_start"in a,a=location.hash.substr(1));var d="",f="";a=a.split("&");var h=!1,m;for(m in a){var k=a[m];if(-1===k.indexOf("="))d=k;else{k=k.split("=");var n=k[1];switch(k[0]){case "t":f=n;h=!0;break;case "autoplay":h=!0;break;case "auto_play":h=!0}}}if(""===f||e&&!h)return"function"===typeof c&&c(),!1;b.jumpIdAt(d,f,c);document.location.hash="#"+d;return!0},update_act_container:function(a,c){c.classList.remove(b.container.classname+"-act-loading",b.container.classname+"-act-pause",b.container.classname+
"-act-play");c.classList.add(b.container.classname+"-act-"+a)},update_playbutton:function(a,c,e){c.readyState<c.HAVE_CURRENT_DATA?b.update_act_container("loading",e):c.paused?b.update_act_container("pause",e):b.update_act_container("play",e)},update_line:function(a,b,e,d){b._elements[e+"line"].style.width=0===a.duration?0:String(100*d/a.duration)+"%"},update_time:function(a,c,e){var d=b.absolutize_url(c.dataset.canonical)+"#";d+=c.id?c.id+"&":"";a=b.convertSecondsInTime(c.currentTime);var f=e._elements.elapse;
f.href=d+("t="+a);d="\u2026";isNaN(Math.round(c.duration))||(d=b.convertSecondsInTime(Math.round(c.duration)));f.innerHTML=a+'<span class="'+b.container.classname+'-nosmall">\u00a0/\u00a0'+d+"</span>";b.update_line(c,e,"elapsed",c.currentTime)},update_id_container_infos:function(a){a=document.getElementById(a);var c=this.target;if("error"===c.error)switch(b.update_act_container("error",a),c.error.code){case c.error.MEDIA_ERR_ABORTED:alert(module$__$__.default.s("media_err_aborted"));break;case c.error.MEDIA_ERR_NETWORK:alert(module$__$__.default.s("media_err_network"));
break;case c.error.MEDIA_ERR_DECODE:alert(module$__$__.default.s("media_err_decode"));break;case c.error.MEDIA_ERR_SRC_NOT_SUPPORTED:alert(module$__$__.default.s("media_err_src_not_supported"));break;default:alert(module$__$__.default.s("media_err_unknow"))}else b.update_playbutton(this,c,a),b.update_time(this,c,a)},update:function(a){var c=a.target;c._ondemiroir.forEach(b.update_id_container_infos,a);c.paused||localStorage.setItem(c.currentSrc,String(c.currentTime))},find_container:function(a){return a.closest?
a.closest("."+b.container.classname):a.className===b.container.classname?a:b.find_container(a.parentNode)},show_thobber_at:function(a,c){var e=document.getElementById(a.dataset.ondeplayer);1>e.duration||(a=a._elements.popup,a.style.opacity=1,a.style.left=100*c/e.duration+"%",a.innerHTML=b.convertSecondsInTime(c))},hide_throbber:function(a){a._elements.popup.style.opacity=0},hide_throbber_later:function(a){var c=a._elements.popup;c._hider&&window.clearTimeout(c._hider);c._hider=window.setTimeout(b.hide_throbber,
1E3,a)},do_hover:function(a){var c=a.target.getClientRects()[0].left;c=(a.clientX-c)/a.target.clientWidth;a=b.find_container(a.originalTarget);var e=document.getElementById(a.dataset.ondeplayer);b.show_thobber_at(a,c*e.duration)},do_out:function(a){b.hide_throbber(b.find_container(a.originalTarget))},do_throbble:function(a){var c=b.find_container(a.target);c=document.getElementById(c.dataset.ondeplayer);var e=a.target.getClientRects()[0].left;b.seekElementAt(c,(a.clientX-e)/a.target.clientWidth*c.duration)},
do_pause:function(a,c){void 0===c&&(a=b.find_container(a.target),c=document.getElementById(a.dataset.ondeplayer));c.pause();b.current_audiotag_playing=null;localStorage.removeItem(c.currentSrc)},do_play:function(a,c){void 0===c&&(a=b.find_container(a.target),c=document.getElementById(a.dataset.ondeplayer));b.only_play_one_audiotag&&b.current_audiotag_playing&&b.do_pause(void 0,document.getElementById(b.current_audiotag_playing));b.current_audiotag_playing=c.id;c.play()},do_onkey:function(a){function c(a){a=
d.currentTime+a;b.seekElementAt(d,a);b.show_thobber_at(e,a);b.hide_throbber_later(e)}var e=b.find_container(a.target),d=document.getElementById(e.dataset.ondeplayer);switch(a.keyCode){case 27:b.seekElementAt(d,0);d.pause();break;case 32:d.paused?d.play():d.pause();break;case 35:b.seekElementAt(d,d.duration);break;case 36:b.seekElementAt(d,0);break;case 37:c(-b.keymove);break;case 39:c(+b.keymove)}},absolutize_url:function(a){var b=document.createElement("a");b.href=a;return b.href},update_links:function(a,
c){var e=a.dataset.canonical;if(void 0===e)e="";else{var d=e.indexOf("#");e=-1===d?e:e.substr(0,d)}e=e+"#"+a.id+(0===a.currentTime?"":"&t="+b.convertSecondsInTime(a.currentTime));e=encodeURI(b.absolutize_url(e));d=encodeURI(a.title);c._elements.twitter.href="https://twitter.com/share?text="+d+"&url="+e+"&via=dascritch";c._elements.facebook.href="https://www.facebook.com/sharer.php?t="+d+"&u="+e;c._elements.email.href="mailto:?subject="+d+"&body="+e;c._elements.link.href=a.currentSrc;c._elements.playlist.href=
b.playlister},show_actions:function(a){a=b.find_container(a.target);a._elements.pagemain.style.display="none";a._elements.pageshare.style.display="flex";b.update_links(document.getElementById(a.dataset.ondeplayer),a)},show_main:function(a){a=b.find_container(a.target);a._elements.pagemain.style.display="flex";a._elements.pageshare.style.display="none"},push_in_playlist:function(a){b.playlist_window.push_in_playlist?b.playlist_window.push_in_playlist(a):window.setTimeout(b.push_in_playlist,500,a)},
add_playlist:function(a){b.playlist_window=window.open(b.playlister+"#","onde_miroir_player");var c=b.find_container(a.target);c=document.getElementById(c.dataset.ondeplayer);b.push_in_playlist({src:b.absolutize_url(c.currentSrc),title:c.title,cover:b.absolutize_url(b.element_attribute(c,"poster",b.poster_fallback)),canonical:b.absolutize_url(c.dataset.canonical)});c.pause();a.preventDefault()},element_attribute:function(a,b,d){return void 0===a.attributes[b]?d:a.attributes[b].value},get_params_for_template:function(a){void 0===
a.dataset.canonical&&(a.dataset.canonical=document.location.href);return{"{{title}}":""===a.title?"<em>"+module$__$__.default.s("untitled")+"</em>":a.title,"{{canonical}}":b.absolutize_url(a.dataset.canonical),"{{poster}}":b.absolutize_url(b.element_attribute(a,"poster",b.poster_fallback)),"{{classname}}":b.container.classname,"{{playlister}}":b.playlister}},rebuild:function(a){var c=a.target;c._ondemiroir.forEach(function(a){a=document.getElementById(a);void 0===a.dataset.ondeplayer?(a.remove(),
b.build_for_audiotag(c)):(a.innerHTML="",b.build_for_placeholder(a))})},add_id_to_container:function(a){a.id=""!==a.id?a.id:b.container.idPrefix+String(b.count_element++)},add_id_to_audiotag:function(a){""===a.id&&(a.id=b.dynamicallyAllocatedIdPrefix+String(b.count_element++))},add_related_controller:function(a,c){b.add_id_to_container(c);-1<a._ondemiroir.indexOf(c.id)||a._ondemiroir.push(c.id)},build_controller:function(a,c){a.dataset.ondeplayer=c.id;a.classList.add(b.container.classname);a.innerHTML=
module$__$__.default.populate(module$__$__.default.populate(module$ondeplayer_html.default),b.get_params_for_template(c));a.tabIndex=0;a._elements={};d("*",function(c){c.classList.forEach(function(d){-1<d.indexOf(b.container.classname+"-")&&(d=d.substr(b.container.classname.length+1),a._elements[d]=c)})},a);b.add_related_controller(c,a);var e={pause:b.do_play,play:b.do_pause,time:b.do_throbble,actions:b.show_actions,back:b.show_main,poster:b.show_main,playlist:b.add_playlist};for(f in e)a._elements[f].addEventListener("click",
e[f]);a.addEventListener("keydown",b.do_onkey);e=a._elements.time;var f={mouseover:!0,mousemove:!0,mouseout:!1,touchstart:!0,touchend:!1,touchcancel:!1};for(var l in f)e.addEventListener(l,f[l]?b.do_hover:b.do_out);b.show_main({target:a.querySelector("a")});b.update({target:c});return a},find_placeholders:function(a){var c=document.getElementById(a.dataset.ondeplayer);null!==c&&(b.add_related_controller(c,a),b.build_controller(a,c))},recall_stored_play:function(a){if(null===b.current_audiotag_playing){a=
a.target;var c=Number(localStorage.getItem(a.currentSrc));0<c&&(b.seekElementAt(a,c),b.do_play(void 0,a))}},build_for_audiotag:function(a){void 0===a._ondemiroir&&(a._ondemiroir=[]);b.add_id_to_audiotag(a);var c=document.createElement(b.container.tagname);c.dataset.ondeplayer=a.id;a.parentNode.insertBefore(c,a);"ready load loadeddata canplay abort play playing pause suspend ended durationchange loadedmetadata progress timeupdate waiting".split(" ").forEach(function(c){a.addEventListener(c,b.update)});
a.addEventListener(b.rebuild_eventname,b.rebuild);a.addEventListener("loadedmetadata",b.recall_stored_play);a.addEventListener("ready",b.recall_stored_play);a.addEventListener("canplay",b.recall_stored_play);""===a.preload&&(a.preload="metadata");a.load();b.update({target:a});b.recall_stored_play({target:a});!1===b.dontHideAudioTag&&(a.hidden=!0,a.removeAttribute("controls"),a.setAttribute("data-ondeplayer",""))},prevent_link_on_same_page:function(a){b.absolutize_url(document.location.href)===b.absolutize_url(a.target.href)&&
a.preventDefault()},element_prevent_link_on_same_page:function(a){a.addEventListener("click",b.prevent_link_on_same_page)},insertStyle:function(){var a=document.createElement("style");a.id=b.styleId;b.is_in_playlist&&(module$ondeplayer_css.default+=" .{{classname}}-playlist { display : none; }");a.innerHTML=module$__$__.default.populate(module$ondeplayer_css.default,b.get_params_for_template(a));document.getElementsByTagName("head")[0].appendChild(a)},launch:function(){function a(a){var c=a.src.indexOf("ondeplayer.js");
-1<c&&(b.playlister=b.absolutize_url(a.src.substr(0,c)+"index.html"),b.playlister===document.location.href.replace(/#.*$/,"")&&(b.is_in_playlist=!0))}null===document.getElementById(b.styleId)&&(b.playlister||d("script[src]",a),d(b.selector_media,b.build_for_audiotag),d(b.selector_container,b.find_placeholders),b.insertStyle(),d("."+b.container.classname+"-canonical",b.element_prevent_link_on_same_page),b.hashOrder({at_start:!0}),window.addEventListener("hashchange",b.hashOrder,!1))}};(function(){for(var a in module$ondeplayer_svg.default)module$ondeplayer_i18n.default["-"]["svg:"+
a]='<svg viewBox="0 0 32 32">'+module$ondeplayer_svg.default[a]+"</svg>";module$__$__.default.merge_source(module$ondeplayer_i18n.default)||module$__$__.default._add_locale("en",module$ondeplayer_i18n.default)})();null!==document.body?b.launch():document.addEventListener("DOMContentLoaded",b.launch,!1);return b}}();
