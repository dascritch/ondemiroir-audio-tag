
var cpu_style= `

.{{classname}}, .{{classname}} *, .{{classname}}-cover img {
	font-family : Lato, "Open Sans", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
	font-size : 15px;
	border : none;
	padding : 0;
	margin : 0;
}
.{{classname}} {
	display : flex;
	background : #555;
	color : #ccc;
}

.{{classname}}.{{classname}}-act-error {
	color : #cc0;
}

.{{classname}} a {
	color : #aaf;
	border : none !important;
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
	height : 64px;
	text-align : center;
	vertical-align : middle;
}
.{{classname}}-actions,
.{{classname}}-back {
	cursor : pointer;
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

.{{classname}}-act-loading .{{classname}}-elapsedline,
.{{classname}}-loadingline {
	opacity : 0.3;
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
	.{{classname}}-cover , .{{classname}}-play , .{{classname}}-pause, .{{classname}}-actions  {
		flex : 0 0 32px;
		height : 32px;
	}
	.{{classname}} svg {
  		width:32px;
		height : 32px;
	}
  	.{{classname}}-nosmall {
		display : none;
  	}
  	.{{classname}}-elapse {
  		flex : 1 0 80px;
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

`
export default cpu_style;
