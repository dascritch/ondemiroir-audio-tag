
var cpu_style= `

.{{classname}}, .{{classname}} *, .{{classname}}-cover img {
	font-family : Lato, "Open Sans", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
	font-size : 15px;
	line-height : 1.2;
	border : none;
	padding : 0;
	margin : 0;
	transition : none;
}
.{{classname}} {
	display : flex;
	background : #555;
	color : #ccc;
	height : 64px;
}

.{{classname}}.{{classname}}-act-error {
	color : #cc0;
}

.{{classname}} a {
	color : #aaf;
	border : none !important;
	text-decoration : none;
}
.{{classname}} svg {
  	fill : #ffffff;
  	width:64px;
	height : 64px;
}
.{{classname}} a:hover {
	color : #555;
	background : #aaf;
}
.{{classname}} a:hover svg {
	fill : #555;
}
.{{classname}}-loading, .{{classname}}-play, .{{classname}}-pause {
	width : 0px;
}

.{{classname}}-act-loading .{{classname}}-loading,
.{{classname}}-act-play .{{classname}}-play,
.{{classname}}-act-pause .{{classname}}-pause,
.{{classname}}-actions,
.{{classname}}-back {
	flex : 0 0 64px;
	width : 64px;
	max-height : 64px;
	height : 100%;
	text-align : center;
	vertical-align : middle;
}
.{{classname}}-actions,
.{{classname}}-back {
	cursor : pointer;
}

.{{classname}}-act-loading .{{classname}}-loading circle:nth-child(1) {
	  animation: {{classname}}-pulse0 2s infinite;
}

.{{classname}}-act-loading .{{classname}}-loading circle:nth-child(2) {
	  animation: {{classname}}-pulse1 2s infinite;
}

.{{classname}}-act-loading .{{classname}}-loading circle:nth-child(3) {
	  animation: {{classname}}-pulse2 2s infinite;
}

@keyframes {{classname}}-pulse0 {
    0% {
        opacity : 1;
    }
    50% {
        opacity : 0;
    }
    100% {
        opacity : 1;
    }
}

@keyframes {{classname}}-pulse1 {
    0% {
        opacity : 0.75;
    }
    12% {
        opacity : 1;
    }
    62% {
        opacity : 0;
    }
    100% {
        opacity : 0.75;
    }
}

@keyframes {{classname}}-pulse2 {
    0% {
        opacity : 0.5;
    }
    25% {
        opacity : 1;
    }
    75% {
        opacity : 0;
    }
    100% {
        opacity : 0.5;
    }
}

@keyframes {{classname}}-pulse4 {
    0% {
        opacity : 0.25;
    }
    37% {
        opacity : 1;
    }
    87% {
        opacity : 0;
    }
    100% {
        opacity : 0.5;
    }
}

.{{classname}}-cover img {
	width : 64px;
    max-width: 100%;
	height : 64px;
	object-fit: contain;
}

.{{classname}}-loading svg, .{{classname}}-play svg, .{{classname}}-pause svg, .{{classname}}-actions svg {
	vertical-align : middle;
	max-width : 100%;
	max-height : 100%;
}
.{{classname}}-titleline {
	display : flex;
	position : relative;
}
.{{classname}}-about, .{{classname}}-title {
	flex : 1 1 100%;
}
.{{classname}}-title a {
    display : block;
	text-overflow : ellipsis;
	max-height: 48px;
	overflow: hidden;

}
.{{classname}}-elapse {
	flex : 1 0 120px;
	text-align : right;
}
.{{classname}}-time {
	background : black;
	width : 100%;
	height : 10px;
	display : block;
	border-radius : 4px;
	position : relative;
}
.{{classname}}-loadingline,
.{{classname}}-elapsedline {
	background : white;
	height : 10px ;
	display : block ;
	position : absolute;
	left : 0;
	border-radius : 4px;
	pointer-events : none;
}

.{{classname}}-act-loading .{{classname}}-loadingline {
	animation: {{classname}}-pulse3 2s infinite;
}
.{{classname}}-pagemain, .{{classname}}-pageshare, .{{classname}}-share {
	flex : 1 1 100%;
	display : flex;
	align-items: center;
}
.{{classname}}-share {
	text-align : center;
}

.{{classname}}-share a {
	height : 64px;
}

.{{classname}}-share a, .{{classname}}-share div {
	flex : 1 0;
	color : white;
	text-decoration : none;
	overflow : hidden;
	text-overflow : clip;
}
.{{classname}}-share svg {
	vertical-align : middle;
  		width:32px;
		height : 32px;
}
.{{classname}}-twitter {background : #4DB5F4}
.{{classname}}-facebook {background : #5974CC}
.{{classname}}-email {background : #CC0000}
.{{classname}}-link {background : #77F}

@media screen and (max-width: 640px) {
	.{{classname}} {
		height : 32px;
	}
  	.{{classname}}-nosmall {
		display : none;
  	}
	.{{classname}}-act-loading .{{classname}}-loading,
	.{{classname}}-act-play .{{classname}}-play,
	.{{classname}}-act-pause .{{classname}}-pause,
	.{{classname}}-actions {
		flex : 0 0 32px;
		height : 32px;
		width : 32px;
	}
	.{{classname}} svg {
  		width:32px;
		height : 32px;
	}
	.{{classname}}-title a {
		max-height : 16px;
	}

  	.{{classname}}-elapse {
  		flex : 1 0 80px;
		max-height : 16px;
  	}

  	.{{classname}}-share a {
		height : 32px;
	}
}
@media screen and (max-width: 319px) {
	.{{classname}}-elapse {
		display : none;
	}
}

.{{classname}}-popup {
	position: absolute;
	height: 12px;
	min-width : 40px;
	font-size : 11px;
	text-align : center;
	padding : 4px;
	border-radius: 4px;
	background : #ccc;
	color : #555;
	opacity : 0;
	transition : opacity 1s;
	pointer-events : none;
} 

.{{classname}}-popup:before {
	content:"";
	position: absolute;
	left: 20px;
	top: -16px;
	height : 0;
	width: 0;
	border-bottom: 16px solid #ccc;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	pointer-events : none;
} 

`
export default cpu_style;
